import initStoryshots, {
  multiSnapshotWithOptions,
} from "@storybook/addon-storyshots";
import path from "path";

initStoryshots({
  integrityOptions: { cwd: path.resolve(__dirname, "../..") },
  test: multiSnapshotWithOptions(),
});
