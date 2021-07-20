import { Story, Meta } from "@storybook/react";

export default {
  title: "Visual identity/Styleguide",
} as Meta;

const Template: Story = () => (
  <div className='container mx-auto max-w-3xl py-8'>
    <img
      src='/images/logo/v4/symbol-and-type/coloured.svg'
      alt='Stadtpuls logo'
      className='mr-8 mb-4'
    />
    <h1 className='leading-tight text-4xl font-bold font-headline mb-8 text-purple'>
      Visual Identity Guidelines
    </h1>
    <article className='prose'>
      <p className='lead'>
        Stadtpuls&apos; visual identity communicates playfulness, innovation,
        technology, participation, experimentation, curiosity, and community. It
        conveys a casual yet serious tone, expressed through colors, shapes,
        pictures, patterns, and other visual mechanisms.
      </p>
      <p>
        To maintain visual consistency and to ensure it always carries the right
        look and feel, there are a few guidelines to follow when using visual
        assets. This page describes those guidelines and provides an overview of
        the visual identity&apos;s fundaments.
      </p>
      <h2>Logo</h2>
      <p>
        The Logo is the primary carrier of Stadtpuls&apos; identity. Therefore,
        it is crucial to use it persistently. It has been designed, however, to
        appear in various forms and color variations while retaining its essence
        and recognizability.
      </p>
      <p>
        It consists of a <strong>symbol area</strong>, in which a visual analogy
        to the <strong>sensor data</strong> or{" "}
        <strong>electronic circuits</strong> is represented, and the{" "}
        <strong>name area</strong>.
      </p>
      <p>
        When the <strong>symbol area</strong> and the <strong>name area</strong>{" "}
        are used in combination, the <strong>symbol area</strong> is
        rectangular. When the <strong>symbol area</strong> is used alone,
        however, it is always displayed in a square ratio.
      </p>
    </article>
    <div className='flex gap-16 mt-8'>
      <div>
        <h4 className='font-bold font-headline'>Combined</h4>
        <div className='grid grid-cols-2 gap-8 my-6'>
          <img
            src='/images/logo/v3/symbol-and-type/coloured.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v2/symbol-and-type/coloured.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v4/symbol-and-type/coloured.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v1/symbol-and-type/coloured.svg'
            alt='Stadtpuls logo'
          />
        </div>
        <article className='prose'>
          <p>
            The combined logo is the primary logo and should always be
            preferred. To avoid repetition or when space is lacking, the symbol
            is used instead.
          </p>
        </article>
      </div>
      <div>
        <h4 className='font-bold font-headline'>Symbol only</h4>
        <div className='grid grid-cols-3 gap-8 my-6'>
          <img src='/images/logo/v1/square/coloured.svg' alt='Stadtpuls logo' />
          <img src='/images/logo/v2/square/coloured.svg' alt='Stadtpuls logo' />
          <img src='/images/logo/v3/square/coloured.svg' alt='Stadtpuls logo' />
          <img src='/images/logo/v4/square/coloured.svg' alt='Stadtpuls logo' />
          <img src='/images/logo/v5/square/coloured.svg' alt='Stadtpuls logo' />
        </div>
        <article className='prose'>
          <p>
            The symbol is to be used alone only in the context of a Stadtpuls
            website, application, poster, etc. It shouldn&apos;t be used in
            isolation in an external context.
          </p>
        </article>
      </div>
    </div>
    <article className='prose mt-8'>
      <h3>Modifications</h3>
      <p>
        The logo is intentionally vibrant and spirited, and thus should always
        be used in color, and aside from its programmed variations,{" "}
        <strong>must not be altered in any way.</strong>
      </p>
      <p className='p-4 border border-warning'>
        <span
          role='img'
          aria-label='warning'
          className='font-bold mr-2 font-mono'
        >
          👎
        </span>{" "}
        Coloring, skewing, or modifying the content or composition of the logo
        is a <strong>no-go</strong>.
      </p>
      <h3>Monochrome versions</h3>
      <p>
        In some rare cases, where displaying the colored logo isn&apos;t
        possible (i.e. on most sensors&apos; displays), a monochrome version of
        the logo is better suited. There are two variations available (positive
        and negative) that can be picked according to the situation.
      </p>
    </article>
    <div className='flex gap-16 mt-8'>
      <div>
        <h4 className='font-bold font-headline'>Combined positive</h4>
        <div className='grid grid-cols-2 gap-8 my-6'>
          <img
            src='/images/logo/v3/symbol-and-type/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v2/symbol-and-type/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v4/symbol-and-type/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v1/symbol-and-type/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
        </div>
      </div>
      <div>
        <h4 className='font-bold font-headline'>Combined negative</h4>
        <div className='grid grid-cols-2 gap-8 my-6'>
          <img
            src='/images/logo/v3/symbol-and-type/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v2/symbol-and-type/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v4/symbol-and-type/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v1/symbol-and-type/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
        </div>
      </div>
    </div>
    <div className='flex gap-16 mt-8'>
      <div>
        <h4 className='font-bold font-headline'>Symbol only positive</h4>
        <div className='grid grid-cols-2 gap-8 my-6'>
          <img
            src='/images/logo/v3/square/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v2/square/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v4/square/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v1/square/monochrome/positive.svg'
            alt='Stadtpuls logo'
          />
        </div>
      </div>
      <div>
        <h4 className='font-bold font-headline'>Symbol only negative</h4>
        <div className='grid grid-cols-2 gap-8 my-6'>
          <img
            src='/images/logo/v3/square/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v2/square/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v4/square/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
          <img
            src='/images/logo/v1/square/monochrome/negative.svg'
            alt='Stadtpuls logo'
          />
        </div>
      </div>
    </div>
    <article className='prose mt-8'>
      <h3>Choosing a version</h3>
      <p>
        As the logo comes in different variations, one might wonder which
        version to pick in what circumstance. The logo can vary in the symbol
        used as well as in the colors. The selection of the visualization is
        arbitrary while the color section is dependent on the context. There are
        two key aspects:
      </p>
      <ul>
        <li>
          <strong>Contrast:</strong>
          <p>
            The colors used should always have high contrast with their sibling
            elements and the background. The visual separation of the logo from
            its background and the legibility of the name is especially
            important.
          </p>
        </li>
        <li>
          <strong>Variation:</strong>
          <p>
            The identity relies on variation to convey playfulness. Therefore,
            it is crucial to ensure that all primary colors appear in the logo
            while never overlapping or touching.
          </p>
        </li>
      </ul>
    </article>
    <article className='prose mt-8'>
      <h2>Colors</h2>
      <p>
        Stadpuls&apos;s colors are vibrant, futuristic, playful, and call for
        experimentation and fun. They work well together and allow for appealing
        compositions, illustrations, and effects.
      </p>
      <p>
        There are three primary colors:{" "}
        <span className='bg-purple w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Purple</strong>,{" "}
        <span className='bg-blue w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Blue</strong>, and{" "}
        <span className='bg-green w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Green</strong>. Secondary colors such as{" "}
        <span className='bg-black w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Black</strong> and{" "}
        <span className='bg-white border border-gray-200 w-3 h-3 rounded-full inline-block mx-1' />{" "}
        <strong>White</strong> serve as calming and stable colors. Finally,
        Stadpuls has its own shades of
        <span className='inline-flex rounded-lg overflow-hidden mx-1 border border-gray-200'>
          <span className='bg-gray-50 w-3 h-3 inline-block' />
          <span className='bg-gray-100 w-3 h-3 inline-block' />
          <span className='bg-gray-200 w-3 h-3 inline-block' />
          <span className='bg-gray-300 w-3 h-3 inline-block' />
          <span className='bg-gray-400 w-3 h-3 inline-block' />
          <span className='bg-gray-500 w-3 h-3 inline-block' />
          <span className='bg-gray-600 w-3 h-3 inline-block' />
          <span className='bg-gray-700 w-3 h-3 inline-block' />
          <span className='bg-gray-800 w-3 h-3 inline-block' />
          <span className='bg-gray-900 w-3 h-3 inline-block' />
        </span>
        <strong>Gray</strong>. For error fields we use{" "}
        <span className='bg-error w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Error red</strong>, and for warnings we use{" "}
        <span className='bg-orange w-3 h-3 rounded-full inline-block mx-1' />
        <strong>Warning orange</strong>.
      </p>
      <img src='/images/docs/colors-presentation.svg' alt='Color codes' />
      <p>
        Not all colors have the same importance, however. The image below
        includes a visual estimation of how they are used proportionally to
        eachother depending on their background.
      </p>
      <img
        src='/images/docs/colors-representation.svg'
        alt='How colors are distributed'
      />
      <p>
        These rules of thumb are flexible. Depending on the context, one color
        can spontaneously take up more space and feel more present than another.
      </p>
    </article>
    <article className='prose mt-8'>
      <h2>Patterns</h2>
      <p>
        Patterns are discrete visual reminders of Stadpuls&apos;s visual
        identity. They include a simple dot, which is an analogy to the electric{" "}
        <em>breadboard</em>. They are used as backgrounds, exist in light and
        dark and can be used to bring rythm to compositions.
      </p>
      <figure>
        <img
          src='/images/docs/pattern-explanation.svg'
          alt='How patterns work'
        />
        <figcaption>
          Patterns are an analogy to electric <em>breadboards</em>
        </figcaption>
      </figure>
      <div className='grid grid-cols-2 gap-8'>
        <div className='h-40 rounded bg-black-dot-pattern' />
        <div className='h-40 rounded bg-white-dot-pattern' />
      </div>
    </article>
    <article className='prose mt-8'>
      <h2>Images</h2>
      <p>
        Images are able to vehiculate more that graphical elements or text will
        ever be able to. Stadpuls&apos;s visual identity uses images to blance
        technological look and feel (source of coldness) and human touch (source
        of warmth). To achieve a playful, experimental, and forward appeal,
        graphic elements and images are combined – sometimes more intensely,
        sometimes less.
      </p>
      <figure>
        <img
          src='/images/docs/images-graphics-combinations.png'
          alt='How images and graphics are combined'
        />
        <figcaption>
          Decorative/Moody combination of images and graphics
        </figcaption>
      </figure>
      <h3>Subjects in images vs. the role of graphics</h3>
      <p>
        The subject of images should preferably include people and city
        landscapes and avoid focusing solely on sensors or technology. Graphic
        elements have the role of rather conveying future oriented thinking,
        technological innovation. Images, on the other side, communicate a
        feeling of community, fun, experimentation, and civic engagement. Both
        graphics and images should be combined to achieve a look and feel
        aligned with Stadpuls&apos;s values and purpose.
      </p>
    </article>
  </div>
);

export const Default = Template.bind({});
Default.args = {};
