import * as mailgunLoader from 'mailgun-js';
import config from '../config'

let mailgun = mailgunLoader({
    apiKey: config.keys.apiKey,
    domain : config.keys.domain
});

const sendEmail = (to: string, from : string, subject: string, content: string) => {
    let data = {
        to,
        from,
        subject,
        text: content
    };
    return mailgun.messages().send(data)
};

export default sendEmail;