/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/auth_tokens": {
    get: {
      parameters: {
        query: {
          nice_id?: parameters["rowFilter.auth_tokens.nice_id"];
          id?: parameters["rowFilter.auth_tokens.id"];
          description?: parameters["rowFilter.auth_tokens.description"];
          user_id?: parameters["rowFilter.auth_tokens.user_id"];
          scope?: parameters["rowFilter.auth_tokens.scope"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["auth_tokens"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** auth_tokens */
          auth_tokens?: definitions["auth_tokens"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          nice_id?: parameters["rowFilter.auth_tokens.nice_id"];
          id?: parameters["rowFilter.auth_tokens.id"];
          description?: parameters["rowFilter.auth_tokens.description"];
          user_id?: parameters["rowFilter.auth_tokens.user_id"];
          scope?: parameters["rowFilter.auth_tokens.scope"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          nice_id?: parameters["rowFilter.auth_tokens.nice_id"];
          id?: parameters["rowFilter.auth_tokens.id"];
          description?: parameters["rowFilter.auth_tokens.description"];
          user_id?: parameters["rowFilter.auth_tokens.user_id"];
          scope?: parameters["rowFilter.auth_tokens.scope"];
        };
        body: {
          /** auth_tokens */
          auth_tokens?: definitions["auth_tokens"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/categories": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.categories.id"];
          name?: parameters["rowFilter.categories.name"];
          description?: parameters["rowFilter.categories.description"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["categories"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** categories */
          categories?: definitions["categories"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.categories.id"];
          name?: parameters["rowFilter.categories.name"];
          description?: parameters["rowFilter.categories.description"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.categories.id"];
          name?: parameters["rowFilter.categories.name"];
          description?: parameters["rowFilter.categories.description"];
        };
        body: {
          /** categories */
          categories?: definitions["categories"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/records": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.records.id"];
          recorded_at?: parameters["rowFilter.records.recorded_at"];
          measurements?: parameters["rowFilter.records.measurements"];
          sensor_id?: parameters["rowFilter.records.sensor_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["records"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** records */
          records?: definitions["records"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.records.id"];
          recorded_at?: parameters["rowFilter.records.recorded_at"];
          measurements?: parameters["rowFilter.records.measurements"];
          sensor_id?: parameters["rowFilter.records.sensor_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.records.id"];
          recorded_at?: parameters["rowFilter.records.recorded_at"];
          measurements?: parameters["rowFilter.records.measurements"];
          sensor_id?: parameters["rowFilter.records.sensor_id"];
        };
        body: {
          /** records */
          records?: definitions["records"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/sensors": {
    get: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.sensors.created_at"];
          id?: parameters["rowFilter.sensors.id"];
          external_id?: parameters["rowFilter.sensors.external_id"];
          name?: parameters["rowFilter.sensors.name"];
          description?: parameters["rowFilter.sensors.description"];
          connection_type?: parameters["rowFilter.sensors.connection_type"];
          location?: parameters["rowFilter.sensors.location"];
          longitude?: parameters["rowFilter.sensors.longitude"];
          latitude?: parameters["rowFilter.sensors.latitude"];
          altitude?: parameters["rowFilter.sensors.altitude"];
          category_id?: parameters["rowFilter.sensors.category_id"];
          icon_id?: parameters["rowFilter.sensors.icon_id"];
          user_id?: parameters["rowFilter.sensors.user_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["sensors"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** sensors */
          sensors?: definitions["sensors"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.sensors.created_at"];
          id?: parameters["rowFilter.sensors.id"];
          external_id?: parameters["rowFilter.sensors.external_id"];
          name?: parameters["rowFilter.sensors.name"];
          description?: parameters["rowFilter.sensors.description"];
          connection_type?: parameters["rowFilter.sensors.connection_type"];
          location?: parameters["rowFilter.sensors.location"];
          longitude?: parameters["rowFilter.sensors.longitude"];
          latitude?: parameters["rowFilter.sensors.latitude"];
          altitude?: parameters["rowFilter.sensors.altitude"];
          category_id?: parameters["rowFilter.sensors.category_id"];
          icon_id?: parameters["rowFilter.sensors.icon_id"];
          user_id?: parameters["rowFilter.sensors.user_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          created_at?: parameters["rowFilter.sensors.created_at"];
          id?: parameters["rowFilter.sensors.id"];
          external_id?: parameters["rowFilter.sensors.external_id"];
          name?: parameters["rowFilter.sensors.name"];
          description?: parameters["rowFilter.sensors.description"];
          connection_type?: parameters["rowFilter.sensors.connection_type"];
          location?: parameters["rowFilter.sensors.location"];
          longitude?: parameters["rowFilter.sensors.longitude"];
          latitude?: parameters["rowFilter.sensors.latitude"];
          altitude?: parameters["rowFilter.sensors.altitude"];
          category_id?: parameters["rowFilter.sensors.category_id"];
          icon_id?: parameters["rowFilter.sensors.icon_id"];
          user_id?: parameters["rowFilter.sensors.user_id"];
        };
        body: {
          /** sensors */
          sensors?: definitions["sensors"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/user_profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.user_profiles.id"];
          name?: parameters["rowFilter.user_profiles.name"];
          display_name?: parameters["rowFilter.user_profiles.display_name"];
          created_at?: parameters["rowFilter.user_profiles.created_at"];
          role?: parameters["rowFilter.user_profiles.role"];
          url?: parameters["rowFilter.user_profiles.url"];
          description?: parameters["rowFilter.user_profiles.description"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["user_profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** user_profiles */
          user_profiles?: definitions["user_profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.user_profiles.id"];
          name?: parameters["rowFilter.user_profiles.name"];
          display_name?: parameters["rowFilter.user_profiles.display_name"];
          created_at?: parameters["rowFilter.user_profiles.created_at"];
          role?: parameters["rowFilter.user_profiles.role"];
          url?: parameters["rowFilter.user_profiles.url"];
          description?: parameters["rowFilter.user_profiles.description"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.user_profiles.id"];
          name?: parameters["rowFilter.user_profiles.name"];
          display_name?: parameters["rowFilter.user_profiles.display_name"];
          created_at?: parameters["rowFilter.user_profiles.created_at"];
          role?: parameters["rowFilter.user_profiles.role"];
          url?: parameters["rowFilter.user_profiles.url"];
          description?: parameters["rowFilter.user_profiles.description"];
        };
        body: {
          /** user_profiles */
          user_profiles?: definitions["user_profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/delete_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/handle_new_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/rpc/handle_deleted_user": {
    post: {
      parameters: {
        body: {
          args: { [key: string]: unknown };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  auth_tokens: {
    nice_id: number;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    description: string;
    /**
     * Note:
     * This is a Foreign Key to `user_profiles.id`.<fk table='user_profiles' column='id'/>
     */
    user_id: string;
    scope: "sudo" | "read" | "write";
  };
  categories: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name:
      | "Temperatur"
      | "CO2"
      | "Luftfeuchtigkeit"
      | "Luftdruck"
      | "Zähler"
      | "Lautstärke"
      | "Helligkeit"
      | "Sonstige";
    description: string;
  };
  records: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    recorded_at: string;
    measurements?: number[];
    /**
     * Note:
     * This is a Foreign Key to `sensors.id`.<fk table='sensors' column='id'/>
     */
    sensor_id: number;
  };
  sensors: {
    created_at: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    external_id?: string;
    name?: string;
    description?: string;
    connection_type: "http" | "ttn" | "other";
    location?: string;
    longitude?: number;
    latitude?: number;
    altitude?: number;
    category_id: number;
    icon_id?: number;
    /**
     * Note:
     * This is a Foreign Key to `user_profiles.id`.<fk table='user_profiles' column='id'/>
     */
    user_id: string;
  };
  user_profiles: {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    name?: string;
    display_name?: string;
    created_at: string;
    role?: "maker" | "taker";
    url?: string;
    description?: string;
  };
}

export interface parameters {
  /** Preference */
  preferParams: "params=single-object";
  /** Preference */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /** Preference */
  preferCount: "count=none";
  /** Filtering Columns */
  select: string;
  /** On Conflict */
  on_conflict: string;
  /** Ordering */
  order: string;
  /** Limiting and Pagination */
  range: string;
  /** Limiting and Pagination */
  rangeUnit: string;
  /** Limiting and Pagination */
  offset: string;
  /** Limiting and Pagination */
  limit: string;
  /** auth_tokens */
  "body.auth_tokens": definitions["auth_tokens"];
  "rowFilter.auth_tokens.nice_id": string;
  "rowFilter.auth_tokens.id": string;
  "rowFilter.auth_tokens.description": string;
  "rowFilter.auth_tokens.user_id": string;
  "rowFilter.auth_tokens.scope": string;
  /** categories */
  "body.categories": definitions["categories"];
  "rowFilter.categories.id": string;
  "rowFilter.categories.name": string;
  "rowFilter.categories.description": string;
  /** records */
  "body.records": definitions["records"];
  "rowFilter.records.id": string;
  "rowFilter.records.recorded_at": string;
  "rowFilter.records.measurements": string;
  "rowFilter.records.sensor_id": string;
  /** sensors */
  "body.sensors": definitions["sensors"];
  "rowFilter.sensors.created_at": string;
  "rowFilter.sensors.id": string;
  "rowFilter.sensors.external_id": string;
  "rowFilter.sensors.name": string;
  "rowFilter.sensors.description": string;
  "rowFilter.sensors.connection_type": string;
  "rowFilter.sensors.location": string;
  "rowFilter.sensors.longitude": string;
  "rowFilter.sensors.latitude": string;
  "rowFilter.sensors.altitude": string;
  "rowFilter.sensors.category_id": string;
  "rowFilter.sensors.icon_id": string;
  "rowFilter.sensors.user_id": string;
  /** user_profiles */
  "body.user_profiles": definitions["user_profiles"];
  "rowFilter.user_profiles.id": string;
  "rowFilter.user_profiles.name": string;
  "rowFilter.user_profiles.display_name": string;
  "rowFilter.user_profiles.created_at": string;
  "rowFilter.user_profiles.role": string;
  "rowFilter.user_profiles.url": string;
  "rowFilter.user_profiles.description": string;
}
