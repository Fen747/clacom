import { mix, checkIsChoucroute, unblock, checkLoggedIn } from './mixins'
import S3 from 'aws-sdk/clients/s3'

const Bucket = 'preprod-portwest'

const S3Client = new S3({
    accesKeyId: '**********************',
    secretAccessKey: '/**********************',
    region: 'eu-west-3',
    s3_signature_version: 'v4'
})
console.log('S3Client', Meteor.settings.private.aws)

const methodsRequiringEditPerm = mix(
    [checkLoggedIn, checkIsChoucroute, unblock],
    {
        async 'mediamanager.listdirectory'({ path }) {
            const S3Params = {
                Bucket,
                MaxKeys: 100,
                Delimiter: '/',
                Prefix: path
            }

            const promise = await new Promise((resolve, reject) => {
                S3Client.listObjectsV2(S3Params, (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                })
            })
            return promise
        }
    }
)

Meteor.methods({
    ...methodsRequiringEditPerm
})
