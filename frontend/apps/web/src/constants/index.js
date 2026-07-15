export const DYNAMIC_LIST_TYPE = {
    CONTACT_INFO: "CONTACT_INFO",
    SOCIAL_MEDIA: "SOCIAL_MEDIA"
}

export const FIELDS_OF_DYNAMIC_LIST = {
    CONTACT_INFO: {
        type: { type: 'text', text: 'Type', placeholder : 'Type of Contact' },
        number: { type: 'text', text: 'Number',placeholder : 'Number' },
    },
    SOCIAL_MEDIA: {
        type: { type: 'text', text: 'Type',placeholder : 'Type of Social Media' },
        link: { type: 'text', text: 'Number',placeholder : 'Profile URL' },
    },
};