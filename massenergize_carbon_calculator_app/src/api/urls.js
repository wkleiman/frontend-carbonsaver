import { IS_LOCAL, IS_PROD } from '../config/config'
// 
export const URL_ROOT = IS_LOCAL?	"http://localhost:8000":
    (IS_PROD? "http://api.massenergize.org" :
            "http://api-dev.massenergize.org")