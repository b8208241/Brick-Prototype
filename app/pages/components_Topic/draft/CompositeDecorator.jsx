import {questionmarkDecorator, hyphenDecorator} from './decorator/Decorators.js';
import questionmarkStrategy from './decorator/questionmarkStrategy.js'
import hyphenStrategy from './decorator/hyphenStrategy.js';
import {CompositeDecorator} from 'draft-js';
// function CompositeDecorator(){}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const questionmarkStrategy2 = _interopRequireDefault(questionmarkStrategy);
const hyphenStrategy2 = _interopRequireDefault(hyphenStrategy);

export const compositeDecorator = (plugins) => {
  const decorator = plugins
    .filter((plugin) => plugin.decorators !== undefined)
    .map((plugin) => {return plugin.decorators[0]});
  decorator.push({
    strategy: questionmarkStrategy2.default,
    component: questionmarkDecorator,
  },{
    strategy: hyphenStrategy2.default,
    component: hyphenDecorator,
  })

  return new CompositeDecorator(decorator);
}
