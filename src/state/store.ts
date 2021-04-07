import { createStore, thunk, action, computed } from "easy-peasy";
import { StoreModel } from "./model";
import { getProjects, API_VERSION } from "../lib/requests";
import { ProjectType } from "../common/interfaces";

const store = createStore<StoreModel>({
  projects: {
    items: undefined,
    selected: computed(state => (id: number) => {
      if (!state.items) return;
      return state.items.find((item: ProjectType) => item.id === id);
    }),
    save: action((state, payload) => {
      state.items = payload;
    }),
    load: thunk(async actions => {
      const {
        data: { projects },
      } = await getProjects(
        `${process.env.NEXT_PUBLIC_API_URL}/api/${API_VERSION}/projects`
      );
      actions.save(projects);
    }),
  },
  records: {
    segmentSize: 50,
  },
});

export default store;
