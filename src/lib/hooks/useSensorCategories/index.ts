import useSWR from "swr";
import { supabase } from "@auth/supabase";
import { definitions } from "@common/types/supabase";

type CategoriesFetcherSignature = () => Promise<
  definitions["categories"][] | null
>;

const categoriesFetcher: CategoriesFetcherSignature = async () => {
  const { data: categories, error } = await supabase
    .from<definitions["categories"]>("categories")
    .select("*");

  if (error) throw error;
  else if (!categories) throw new Error("Categories not found");
  return categories;
};

export const useSensorCategories = (): {
  isLoading: boolean;
  categories: definitions["categories"][] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<definitions["categories"][] | null, Error>(
    "categories",
    categoriesFetcher
  );

  return {
    isLoading: !error && !data,
    categories: data || null,
    error: error || null,
  };
};
