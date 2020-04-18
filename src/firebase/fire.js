import firebase from 'firebase'
import { config } from '../environment'

const fire = firebase.initializeApp(config)

export default fire