import Email from './Email'
import TTC from './TTC'
import List from './List'
import Relationnal from './Relationnal'
import DateWidget from './Date'
import Username from './Username'

export default class Widgets {
    static email = Email
    static ttc = TTC
    static list = List
    static relationnal = Relationnal
    static date = DateWidget
    static username = Username
    static default = ({ column, ...line }) => line[column.name]
}
