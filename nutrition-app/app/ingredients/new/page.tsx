"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Header } from "@/components/layout/header"

const formSchema = z.object({
  ingredient_name: z.string().min(2, "Ingredient name must be at least 2 characters").max(100),
  default_unit: z.string().min(1, "Default unit is required").max(20),
  calories_per_100g: z.coerce.number().min(0, "Calories cannot be negative"),
  fat_g: z.coerce.number().min(0, "Fat cannot be negative"),
  protein_g: z.coerce.number().min(0, "Protein cannot be negative"),
  carbohydrates_g: z.coerce.number().min(0, "Carbohydrates cannot be negative"),
})

export default function NewIngredientPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ingredient_name: "",
      default_unit: "g",
      calories_per_100g: 0,
      fat_g: 0,
      protein_g: 0,
      carbohydrates_g: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error("Failed to create ingredient")
      }

      const data = await response.json()

      toast({
        title: "Ingredient created",
        description: `${values.ingredient_name} has been created successfully.`,
      })

      router.push("/ingredients")
      router.refresh()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create ingredient. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Create New Ingredient" description="Add a new ingredient to your database" />

      <main className="flex-1 p-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>New Ingredient</CardTitle>
            <CardDescription>Enter the nutritional information for your new ingredient</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="ingredient_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ingredient Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ingredient name" {...field} />
                      </FormControl>
                      <FormDescription>This name must be unique in your database.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="default_unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default Unit</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., g, ml, oz" {...field} />
                      </FormControl>
                      <FormDescription>The standard unit of measurement for this ingredient.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="calories_per_100g"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Calories (per 100g)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="protein_g"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Protein (g)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fat_g"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fat (g)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="carbohydrates_g"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Carbohydrates (g)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create Ingredient"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
