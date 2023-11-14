import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

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

  // Create a new product
  createProduct: protectedProcedure
  .input(z.object({ 
    name: z.string().min(1),
    sellPricePerKg: z.number(),
    ingredients: z.array(z.object({
      ingredientId: z.number(),
      quantity: z.number(),
    })),
  }))
  .mutation(async ({ ctx, input }) => {
    return ctx.db.product.create({
      data: {
        name: input.name,
        sellPricePerKg: input.sellPricePerKg,
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
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.update({
        where: { id: input.id },
        data: {
          name: input.name,
          sellPricePerKg: input.sellPricePerKg,
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
