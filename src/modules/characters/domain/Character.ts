export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    resourceURI: string;
    urls: Url[];
    thumbnail: Image;
    comics: ResourceList;
    stories: ResourceList;
    events: ResourceList;
    series: ResourceList;
    isFavorite?: boolean;
  }


  interface ResourceList {
    available: number;
    returned: number;
    collectionURI: string;
    items: EntitySummary[];
  }

  interface EntitySummary {
    resourceURI: string;
    name: string;
    type?: string;
  }

  interface Url {
    type: string;
    url: string;
  }
  
  interface Image {
    path: string;
    extension: string;
  }
  