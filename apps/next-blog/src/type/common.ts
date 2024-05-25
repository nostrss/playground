import React from 'react';

export type IPropsChildren = {
  children: React.ReactNode;
};

export type PostIdPrevNext = {
  currentPostId?: string;
};

export type ImgesArrayItem = {
  url: string | undefined;
};

export type Post = PostIdPrevNext & {
  title: string;
  description: string;
  date: string;
  tags: string;
  images: ImgesArrayItem[];
};

export type IPropsNav = IPropsChildren & {
  href: string;
};

export type IconProps = {
  size?: number;
  color?: string;
  url?: string;
};

export type Tag = string[];
export type Tags = Tag[];
export type TagCounts = Record<string, any>;

export type HeaderMenu = {
  menu: React.ReactElement;
};

export type HeaderMenus = HeaderMenu[];

export type PostSlug = {
  slug: string;
};

export type TagSlug = {
  tagName: string;
};
