import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { api } from "~/trpc/server";



export const productRouter = createTRPCRouter({
  // Fetch a single product by ID
  getProductById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: { id: input.id },
        include: { ingredients: true },
      });
    }),
  getAllProducts: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.db.product.findMany({
        orderBy:{
          name:'desc'
        }
      })
    }),

  // Create a new product
  // Here will evaluate if > 500kg and make the calculations to get the cost per kg
  createProduct: protectedProcedure
  .input(z.object({ 
    name: z.string().min(1),
    sellPricePerKg: z.number(),
    ingredients: z.array(z.object({
      ingredientId: z.number(),
      quantity: z.number()
    })),
  }))
  .mutation(async ({ ctx, input }) => {
    const ingredientsWeight = input.ingredients.reduce((total, ingredient) => total + ingredient.quantity, 0);

    const ingredientCosts = await Promise.all(input.ingredients.map(async (ingredient) => {
      const ingredientData = await api.ingredient.getIngredientById.query({ id: ingredient.ingredientId });

      if (!ingredientData) {
        throw new Error(`Ingredient with ID ${ingredient.ingredientId} not found`);
      }

      return ingredientData.costPerKg * ingredient.quantity;
    }));

      // Sum up all ingredient costs
    const totalIngredientCost = ingredientCosts.reduce((total, cost) => total + cost, 0);

    // Calculate cost per kg
    const costPerKg = totalIngredientCost / ingredientsWeight as unknown as number;


    return ctx.db.product.create({
      data: {
        name: input.name,
        sellPricePerKg: input.sellPricePerKg,
        costPerKg: costPerKg,
        ingredients: {
          create: input.ingredients.map(ing => ({
            quantity: ing.quantity,
            ingredient: {
              connect: { id: ing.ingredientId },
            },
          })),
        },
      },
    });
  }),
  

// Update an existing product
updateProduct: protectedProcedure
  .input(z.object({
    id: z.number(),
    name: z.string().min(1).optional(),
    sellPricePerKg: z.number().optional(),
    ingredients: z.array(z.object({
      ingredientId: z.number(),
      quantity: z.number()
    })).optional(),
  }))
  .mutation(async ({ ctx, input }) => {
    let costPerKg =0;

    if (input.ingredients) {
      const ingredientsWeight = input.ingredients.reduce((total, ingredient) => total + ingredient.quantity, 0);

      const ingredientCosts = await Promise.all(input.ingredients.map(async (ingredient) => {
        const ingredientData = await api.ingredient.getIngredientById.query({ id: ingredient.ingredientId });

        if (!ingredientData) {
          throw new Error(`Ingredient with ID ${ingredient.ingredientId} not found`);
        }

        return ingredientData.costPerKg * ingredient.quantity;
      }));

      // Sum up all ingredient costs
      const totalIngredientCost = ingredientCosts.reduce((total, cost) => total + cost, 0);

      // Calculate cost per kg
      costPerKg = totalIngredientCost / ingredientsWeight;
    }

    await ctx.db.productIngredient.deleteMany({
      where: {
        productId: input.id
      }
    });

    return ctx.db.product.update({
      where: { id: input.id },
      data: {
        name: input.name,
        sellPricePerKg: input.sellPricePerKg,
        costPerKg: costPerKg,
        ...(input.ingredients && {
          
          ingredients: {
            create: input.ingredients.map(ing => ({
              quantity: ing.quantity,
              ingredient: {
                connect: { id: ing.ingredientId },
              },
            })),
          },
        }),
      },
    });
  }),

  // Delete a product
  deleteProduct: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.delete({
        where: { id: input.id },
      });
    }),

  // Your existing procedures can remain as they are or be modified as needed
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.text}` };
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findFirst({ orderBy: { id: "desc" } });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
