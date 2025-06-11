

export type ArticleBase = {
  id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
};

export type FavoriteArticle = ArticleBase & {
  notes?: string;
};

export type ScientificArticleBase = {
  id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
  doi?: string;
  download?: string;
};

export type FavoriteScientificArticle = ScientificArticleBase & {
  notes?: string;
};

export type ToReadScientificArticle = ScientificArticleBase;

export type ToReadArticle = ArticleBase;

export type CreateFavoriteArticle = {
  title: string;
  description: string;
  url: string;
  notes?: string | null;
}

export type CreateReadArticle = {
  title: string;
  description: string;
  url: string;
}


export type VisitedLink = {
  url: string
  timestamp: string
}


export type UserDto = {
    id: string
    email: string
    name: string
    profileImageUrl?: string
    visitedLinks: VisitedLink[]
}


export type UserProfile = {
  userMainInfo: UserDto;
  favoriteArticles: FavoriteArticle[];
  toReadArticles: ToReadArticle[];
  favoriteScientificArticles: FavoriteArticle[];
  toReadScientificArticles: ToReadArticle[];
};

export type CreateFavoriteScientificArticle = {
  title: string;
  description: string;
  url: string;
  notes?: string | null;
  doi?: string|null 
  download?: string|null
};

export type CreateReadScientificArticle = {
  title: string;
  description: string;
  url: string;
   doi?: string|null 
  download?: string|null
};



