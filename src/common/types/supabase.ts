export interface AuthtokensType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: string;
  description: string;
  /**
   * Note:
   * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
   */
  projectId: number;
  project: ProjectsType;
  /**
   * Note:
   * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
   */
  userId?: string;
  userProfile?: UserProfilesType;
  niceId: number;
}
export interface CategoriesType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: number;
  name:
    | "Temperatur"
    | "CO2"
    | "Luftfeuchtigkeit"
    | "Druck"
    | "PAXCounter"
    | "Lautstärke";
  description: string;
  //Relations
  projects?: ProjectsType[];
}
export interface DevicesType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: number;
  externalId: string;
  name?: string;
  /**
   * Note:
   * This is a Foreign Key to `projects.id`.<fk table='projects' column='id'/>
   */
  projectId: number;
  project?: ProjectsType;
  /**
   * Note:
   * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
   */
  userId?: string;
  userProfile?: UserProfilesType;
  //Relations
  records?: RecordsType[];
}
export interface ProjectsType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: number;
  name: string;
  description?: string;
  createdAt: string;
  connectype: "ttn" | "other";
  location?: string;
  /**
   * Note:
   * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
   */
  userId?: string;
  userProfile?: UserProfilesType;
  /**
   * Note:
   * This is a Foreign Key to `categories.id`.<fk table='categories' column='id'/>
   */
  categoryId: number;
  category?: CategoriesType;
  //Relations
  devices?: DevicesType[];
  authtoken?: AuthtokensType;
}
export interface RecordsType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: number;
  recordedAt: string;
  measurements?: number[];
  longitude?: number;
  latitude?: number;
  altitude?: number;
  /**
   * Note:
   * This is a Foreign Key to `devices.id`.<fk table='devices' column='id'/>
   */
  deviceId: number;
  device?: DevicesType;
}
export interface UserProfilesType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: string;
  name?: string;
  createdAt: string;
  role?: "maker";
  //Relations
  projects?: ProjectsType[];
  devices?: DevicesType[];
  authtokens?: AuthtokensType[];
}

export interface AuthenticatedUsersType {
  id: string;
  app_metadata: {
    provider?: string;
    [key: string]: unknown;
  };
  user_metadata: {
    [key: string]: unknown;
  };
  aud: string;
  confirmation_sent_at?: string;
  email?: string;
  created_at: string;
  confirmed_at?: string;
  last_sign_in_at?: string;
  role?: "maker" | string;
  updated_at?: string;
}
