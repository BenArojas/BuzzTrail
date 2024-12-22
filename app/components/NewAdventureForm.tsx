"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@remix-run/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRemixForm } from "remix-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ShadForm,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import LocationSelector from "~/components/ui/location-input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { cn } from "~/lib/utils";

const formSchema = z.object({
  name: z.string(),
  country: z.tuple([z.string(), z.string().optional()]),
  location: z.string(),
  description: z.string(),
  budget: z.coerce.number().optional(),
  participants: z.coerce.number().gt(0, "Participants must be greater than 0"),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  difficulty: z.string(),
  notes: z.string().optional(),
});
export const resolver = zodResolver(formSchema);
export type AdventureFormData = z.infer<typeof formSchema>;
export default function NewAdventureForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [countryName, setCountryName] = useState<string>("");
  const [stateName, setStateName] = useState<string>("");

  const form = useRemixForm<AdventureFormData>({
    submitConfig: {
      method: "POST",
    },
    resolver,
    defaultValues: {
      name: undefined,
      country: undefined,
      location: undefined,
      description: undefined,
      budget: 0,
      participants: 1,
      difficulty: "easy",
      notes: "",
      startDate: new Date(),
      endDate: new Date(),
    },
    submitData: {
      _action: "create",
    },
  });

  const { reset, formState } = form;
  const { isSubmitSuccessful } = formState;

  // Reset the form when the submission is successful
  // might not be necessary since we redirect to the newly created adventure - let Yahel check
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setCurrentPage(1)
    }
  }, [isSubmitSuccessful, reset]);

  const handleNext = () => {
    // Validate first page fields before moving to next page
    const fields = [
      "name",
      "country",
      "location",
      "description",
      "budget",
    ];

    form.trigger(fields as any).then((isValid) => {
      if (isValid) {
        setCurrentPage(2);
      }
    });
  };

  const handlePrevious = () => {
    setCurrentPage(1);
  };

  return (
    <ShadForm {...form}>
      <Form
        onSubmit={form.handleSubmit}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        {currentPage === 1 && (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Soft ground" type="text" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your adventure code name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Country</FormLabel>
                  <FormControl>
                    <LocationSelector
                      onCountryChange={(country) => {
                        setCountryName(country?.name || "");
                        form.setValue(field.name, [
                          country?.name || "",
                          stateName || "",
                        ]);
                      }}
                      onStateChange={(state) => {
                        setStateName(state?.name || "");
                        form.setValue(field.name, [
                          countryName || "",
                          state?.name || "",
                        ]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    If your country has states, it will be appear after
                    selecting country
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adventure Specific Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Mount Everest" type="" {...field} />
                  </FormControl>
                  <FormDescription>
                    the specific location of your adventure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Placeholder"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Fill the description of your adventures
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participants</FormLabel>
                  <FormControl>
                    <Input placeholder="$$$" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    How many participants will join the adventure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </>
        )}
        {currentPage === 2 && (
          <>
            {/* <div id="dates" className="flex gap-10"> */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start date of the adventure</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End date of the adventure</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </div> */}

            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input placeholder="$$$" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fill the budget for the Adventure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="easy">
                        easy
                      </SelectItem>
                      <SelectItem value="medium">medium</SelectItem>
                      <SelectItem value="hard">
                        hard
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    difficulty level of the adventure
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can ~mention other users and .
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Button type="button" onClick={handlePrevious}>
                Previous
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </>
        )}
      </Form>
    </ShadForm>
  );
}
