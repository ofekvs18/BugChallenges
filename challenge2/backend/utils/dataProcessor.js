/**
 * Data processing utilities with intentional infinite loop bugs
 * These functions will hang on certain inputs for the debugging challenge
 */

// Generic data processor - has infinite loop bug with circular references
function processData(data) {
  console.log('Processing data with generic processor...');
  
  if (data === null || data === undefined) {
    return { result: 'null or undefined data' };
  }
  
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return { result: data, type: typeof data };
  }
  
  if (Array.isArray(data)) {
    const processedArray = data.map(item => processData(item)); // Recursive call - can cause infinite loop
    return {
      type: 'array',
      length: data.length,
      items: processedArray
    };
  }
  
  if (typeof data === 'object') {
    const processedObject = {};
    
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        processedObject[key] = processData(data[key]); 
      }
    }
    
    return {
      type: 'object',
      keys: Object.keys(data),
      processed: processedObject
    };
  }
  
  return { result: 'unknown type', type: typeof data };
}

function processNestedData(data) {
  console.log('Processing nested data...');
  
  function traverseNested(obj, depth = 0) {
    if (depth > 1000) {
      throw new Error('Maximum depth exceeded');
    }
    
    if (obj === null || obj === undefined) {
      return null;
    }
    
    if (typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => traverseNested(item, depth + 1)); 
    }
    
    const result = {};
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = traverseNested(obj[key], depth + 1);
      }
    }
    
    return result;
  }
  
  return traverseNested(data);
}

function processCircularData(data) {
  console.log('Processing circular data...');
  
  function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (Array.isArray(obj)) {
      return obj.map(item => deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = deepClone(obj[key]); 
      }
    }
    
    return cloned;
  }
  
  function analyzeStructure(obj, path = []) {
    if (typeof obj !== 'object' || obj === null) {
      return { type: typeof obj, path: path.join('.') };
    }
    
    const analysis = {
      type: Array.isArray(obj) ? 'array' : 'object',
      path: path.join('.'),
      properties: {}
    };
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        analysis.properties[key] = analyzeStructure(obj[key], [...path, key]); 
      }
    }
    
    return analysis;
  }
  
  return {
    cloned: deepClone(data),
    analysis: analyzeStructure(data)
  };
}

function countProperties(obj) {
  let count = 0;
  
  function countRecursive(current) {
    if (current === null || typeof current !== 'object') {
      return;
    }
    
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        count++;
        countRecursive(current[key]); 
      }
    }
  }
  
  countRecursive(obj);
  return count;
}

function flattenObject(obj, prefix = '') {
  const flattened = {};
  
  function flatten(current, currentPrefix) {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const newKey = currentPrefix ? `${currentPrefix}.${key}` : key;
        
        if (typeof current[key] === 'object' && current[key] !== null) {
          flatten(current[key], newKey); 
        } else {
          flattened[newKey] = current[key];
        }
      }
    }
  }
  
  flatten(obj, prefix);
  return flattened;
}

module.exports = {
  processData,
  processNestedData,
  processCircularData,
  countProperties,
  flattenObject
};