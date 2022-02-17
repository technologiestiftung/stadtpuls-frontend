import initStoryshots, {
  snapshotWithOptions,
} from "@storybook/addon-storyshots";
import path from "path";

initStoryshots({
  test: story => {
    // This adjusts for the fact that the story path is jest config relative,
    // but the storyshot write path is relative to where this file is.
    const snapshotFileName = path.resolve(
      __dirname,
      "../..", // go backwards so when we go forwards again we end up in the right place.
      story.stories2snapsConverter.getSnapshotFileName(story.context)
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return snapshotWithOptions()({ ...story, snapshotFileName });
  },
});
