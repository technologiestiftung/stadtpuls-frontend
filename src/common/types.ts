export type FetchResponse<ResKey extends string, ResType> = {
  data: {
    [key in ResKey]: ResType;
  };
};
