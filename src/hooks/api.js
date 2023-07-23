import { reactive } from 'vue';

const generateImg = async () => {
  const vanguard = `https://images-api.nasa.gov/search?q=VANGUARD`;
  const starlink = `https://images-api.nasa.gov/search?q=STARLINK`;

  try {
    const responses = await Promise.all([fetch(vanguard), fetch(starlink)]);

    const data = await Promise.all(
      responses.map((response) => {
        if (!response.ok) throw new Error('Error fetching satellite image');
        return response.json();
      })
    );

    // merge all collections together
    let mergedCollection = [];
    for (let item of data) {
      mergedCollection = [...mergedCollection, ...item.collection.items];
    }

    return mergedCollection;
  } catch (error) {
    console.error('Error fetching satellite image:', error);
    return [];
  }
};

export const fetchSatelliteImageData = async () => {
  const satelliteImageData = reactive([]);

  try {
    const data = await generateImg();

    if (data) {
      data.map((item) => {
        if (item?.links) {
          satelliteImageData.push(item.links[0].href);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching image data:', error);
  }

  return satelliteImageData;
};

// Function to shuffle the array elements in a random order
export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
