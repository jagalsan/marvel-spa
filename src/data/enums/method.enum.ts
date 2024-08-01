const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
  OPTIONS: "OPTIONS",
  HEAD: "HEAD",
} as const;

// Convert object values to a type
export type HttpMethod = (typeof HttpMethods)[keyof typeof HttpMethods];
