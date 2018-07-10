import Email from './Email'
import TTC from './TTC'
import List from './List'

export default class Widgets {
    static email = Email
    static ttc = TTC
    static list = List
    static default = ({ column, ...line }) => line[column] 
}