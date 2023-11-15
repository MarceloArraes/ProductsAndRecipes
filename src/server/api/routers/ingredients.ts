import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const ingredientRouter = createTRPCRouter({
  // Create a new ingredient
  createIngredient: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1),
      costPerKg: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ingredient.create({
        data: {
          name: input.name,
          costPerKg: input.costPerKg,
        },
      });
    }),

    //Get all ingredients
    getAllIngredients: protectedProcedure
    .query(async ({ctx})=>{
      return ctx.db.ingredient.findMany({
        
      });
    }),


  // Get an ingredient by ID
  getIngredientById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.ingredient.findUnique({
        where: { id: input.id },
        include: { products: true }, // This will include related products
      });
    }),

  // Update an existing ingredient
  updateIngredient: protectedProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().min(1).optional(),
      costPerKg: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ingredient.update({
        where: { id: input.id },
        data: {
          name: input.name,
          costPerKg: input.costPerKg,
        },
      });
    }),

  // Delete an ingredient
  deleteIngredient: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ingredient.delete({
        where: { id: input.id },
      });
    }),
  //get latestIngredient
    getLatestIngredient: publicProcedure.query(async ({ ctx }) => {
        return ctx.db.ingredient.findFirst({
          orderBy: { id: 'desc' },
        });
      }),
      
});
