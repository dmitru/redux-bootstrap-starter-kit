/**
 * Created by dmitriybor on 08.06.16.
 */

import superagentPromisePlugin from 'superagent-promise-plugin'
import superagentDefaults from 'superagent-defaults'
import superagent from 'superagent'

const superagent2 = superagentPromisePlugin.patch(superagent)
const superagent3 = superagentDefaults(superagent2)
export default superagent3
