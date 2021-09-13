import useSWR from "swr";
import { supabase } from "@auth/supabase";
import { CategoriesType } from "@common/types/supabase_DEPRECATED";

type CategoriesFetcherSignature = () => Promise<CategoriesType[] | null>;

const categoriesFetcher: CategoriesFetcherSignature = async () => {
  const { data: categories, error } = await supabase
    .from<CategoriesType>("categories")
    .select("*");

  if (error) throw error;
  else if (!categories) throw new Error("Categories not found");
  return categories;
};

export const useProjectCategories = (): {
  isLoading: boolean;
  categories: CategoriesType[] | null;
  error: Error | null;
} => {
  const { data, error } = useSWR<CategoriesType[] | null, Error>(
    "categories",
    categoriesFetcher
  );

  return {
    isLoading: !error && !data,
    categories: data || null,
    error: error || null,
  };
};
