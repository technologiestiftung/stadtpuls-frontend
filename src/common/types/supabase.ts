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
  user?: UsersType;
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
  projects: ProjectsType[];
}
export interface Devices {
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
  project: ProjectsType;
  /**
   * Note:
   * This is a Foreign Key to `users.id`.<fk table='users' column='id'/>
   */
  userId?: string;
  user?: UsersType;
  //Relations
  records: RecordsType[];
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
  userId: string;
  user: UsersType;
  /**
   * Note:
   * This is a Foreign Key to `categories.id`.<fk table='categories' column='id'/>
   */
  categoryId: number;
  category: CategoriesType;
  //Relations
  devices: Devices[];
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
  device: Devices;
}
export interface UsersType {
  /**
   * Note:
   * This is a Primary Key.<pk/>
   */
  id: string;
  name?: string;
  createdAt: string;
  role?: "maker";
  //Relations
  projects: ProjectsType[];
  devices: Devices[];
  authtokens: AuthtokensType[];
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
  role?: "maker";
  updated_at?: string;
}
