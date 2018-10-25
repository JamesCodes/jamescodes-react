import styleSettings from 'global-styles/core.scss';
export default Object.keys(styleSettings)
    .filter((setting) => setting.indexOf('viewport') > -1)
    .map((setting) => ({
        id: setting.replace('viewport-', ''),
        width: parseInt(styleSettings[setting], 10),
    }));
