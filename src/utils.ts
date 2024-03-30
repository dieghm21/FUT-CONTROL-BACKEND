export const toPlain = (response: any) => {
    // @ts-ignore
    const flattenDataValues = ({ dataValues }) => {
      const flattenedObject = {};
  
      Object.keys(dataValues).forEach(key => {
        const dataValue = dataValues[key];
  
        if (
          Array.isArray(dataValue) &&
          dataValue[0] &&
          dataValue[0].dataValues &&
          typeof dataValue[0].dataValues === 'object'
        ) {
            // @ts-ignore
          flattenedObject[key] = dataValues[key].map(flattenDataValues);
        } else if (dataValue && dataValue.dataValues && typeof dataValue.dataValues === 'object') {
            // @ts-ignore
          flattenedObject[key] = flattenDataValues(dataValues[key]);
        } else {
            // @ts-ignore
          flattenedObject[key] = dataValues[key];
        }
      });
  
      return flattenedObject;
    };
  
    return Array.isArray(response) ? response.map(flattenDataValues) : flattenDataValues(response);
  }