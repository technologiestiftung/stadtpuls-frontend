import "./commands";
import inViewport from './inViewport'

before(() => {
    chai.use(inViewport);
});
