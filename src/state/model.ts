import { Thunk, Action, Computed } from "easy-peasy";
import { ProjectType } from "../common/interfaces";

export interface ProjectsModel {
  items: Array<ProjectType> | undefined;
  selected: Computed<ProjectsModel, ProjectType | any>;
  save: Action<ProjectsModel, ProjectType[]>;
  load: Thunk<ProjectsModel>;
}

export interface StoreModel {
  projects: ProjectsModel;
  records: {
    segmentSize: number;
  };
}
