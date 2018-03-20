import styleSettings from 'styles/settings'; // eslint-disable-line import/extensions
export default Object.keys(styleSettings)
    .filter((setting) => setting.indexOf('screen') > -1)
    .map((setting) => ({
        id: setting.replace('screen-', ''),
        width: parseInt(styleSettings[setting], 10),
    }));
