import * as React from 'react';
import { shallow } from 'enzyme';
import Img from 'gatsby-image';

import PostTemplate from '../index';
import MetaStructuredData from 'components/Pages/Post/Meta/StructuredData';
import MetaTags from 'components/Pages/Post/Meta/Tags';
import Layout from 'components/Layout/Fetch';
import Subheader from 'components/Subheader';
import Edit from 'components/Pages/Post/Edit';
import RecommendedList from 'components/Pages/Post/Recommended/List';
import ShareBottom from 'components/Pages/Post/Share/Bottom';
import Comments from 'components/Pages/Post/Comments';
import AboutAuthor from 'components/Pages/Post/AboutAuthor';
import CarbonAdsFetch from 'components/CarbonAds/Fetch';
import CarbonAdsMetaTags from 'components/CarbonAds/Meta/Tags';
import { TO_POST } from 'routes/path';

const props = {
  authorInfo: {
    name: 'Dmitri Pavlutin',
    description: 'Dmitri Pavlutin is a software developer specialized in Frontend technologies',
    email: 'mail@mail.com',
    nicknames: {
      twitter: 'panzerdp',
    },
    profiles: {
      facebook: 'https://www.facebook.com/dmitri.pavlutin',
      github: 'https://github.com/panzerdp',
      linkedin: 'https://www.linkedin.com/in/dmitri-pavlutin/',
      stackoverflow: 'https://stackoverflow.com/users/1894471/dmitri-pavlutin',
      twitter: 'https://twitter.com/panzerdp',
    },
  },
  authorProfilePictureSrc: '/image.png',
  post: {
    description: 'Useful techniques to facilitate React server-side rendering.',
    html: '<div>JavaScript is a programming language</div>',
    modified: '2019-01-01',
    published: '2018-03-17',
    recommended: ['javascript-language'],
    slug: 'useful-techniques-react-server-side-rendering',
    tags: ['react', 'server side rendering'],
    thumbnail: {
      aspectRatio: 2,
      base64: 'base64',
      sizes: 'some sizes',
      src: 'source',
      srcSet: 'src-set',
    },
    title: 'Useful techniques to facilitate React server-side rendering',
  },
  postRepositoryFileUrl: 'https://github.com/panzerdp/dmitripavlutin.com/tree/master/home/user/my-post.md',
  recommendedPosts: [
    {
      description: 'Useful techniques to facilitate React server-side rendering.',
      published: '2018-03-17',
      slug: 'useful-techniques-react-server-side-rendering',
      tags: ['react', 'server side rendering'],
      thumbnail: {
        aspectRatio: 2,
        base64: 'base64',
        sizes: 'some sizes',
        src: 'source',
        srcSet: 'src-set',
      },
      title: 'Useful techniques to facilitate React server-side rendering',
    },
  ],
  popularPosts: [
    {
      description: 'Useful techniques to facilitate React server-side rendering.',
      published: '2018-03-17',
      slug: 'useful-techniques-react-server-side-rendering',
      tags: ['react', 'server side rendering'],
      title: 'Useful techniques to facilitate React server-side rendering',
    },
  ],
  siteInfo: {
    description: 'Posts by Dmitri Pavlutin about software development',
    repositoryUrl: 'https://github.com/panzerdp/dmitripavlutin.com',
    title: 'Dmitri Pavlutin blog',
    url: 'https://dmitripavlutin.com',
  },
};

const carbonAdsService: CarbonAdsService = {
  isEnabled: true,
  isProductionMode: true,
  scriptSrc: 'http://site.com/script.js',
};

const postUrl = props.siteInfo.url + TO_POST({ slug: props.post.slug });

describe('<PostTemplate />', function() {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should render meta tags', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    expect(
      wrapper
        .find(Layout)
        .contains(<MetaTags post={props.post} siteInfo={props.siteInfo} authorInfo={props.authorInfo} />)
    ).toBe(true);
  });

  it('should render structured meta', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    expect(
      wrapper
        .find(Layout)
        .contains(
          <MetaStructuredData
            post={props.post}
            siteInfo={props.siteInfo}
            authorInfo={props.authorInfo}
            authorProfilePictureSrc={props.authorProfilePictureSrc}
          />
        )
    ).toBe(true);
  });

  it('should render post image', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<Img fluid={props.post.thumbnail} />)).toBe(true);
  });

  it('should render post title', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<h1>{props.post.title}</h1>)).toBe(true);
  });

  it('should render subheader', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<Subheader tags={props.post.tags} published={props.post.published} />)).toBe(true);
  });

  it('should render share buttons', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<ShareBottom url={postUrl} text={props.post.title} tags={props.post.tags} />)).toBe(true);
  });

  it('should render left sidebar', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const leftSidebar = shallow(wrapper.prop('leftSidebar'));
    expect(leftSidebar.exists()).toBe(true);
  });

  it('should render post content', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(
      article.contains(<div className="postContent" dangerouslySetInnerHTML={{ __html: props.post.html }} />)
    ).toBe(true);
  });

  it('should render edit post link', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<Edit url={props.postRepositoryFileUrl} />)).toBe(true);
  });

  it('should render recommended posts', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<RecommendedList posts={props.recommendedPosts} />)).toBe(true);
  });

  it('should render post comments', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(article.contains(<Comments url={postUrl} title={props.post.title} />)).toBe(true);
  });

  it('should render about author', function() {
    const wrapper = shallow(<PostTemplate {...props} />);
    const article = wrapper.find(Layout).find('article');
    expect(
      article.contains(
        <AboutAuthor authorInfo={props.authorInfo} authorProfilePictureSrc={props.authorProfilePictureSrc} />
      )
    ).toBe(true);
  });

  it('should render carbon ads meta tags', function() {
    const wrapper = shallow(<PostTemplate {...props} />)
      .find(CarbonAdsFetch)
      .at(0)
      .renderProp('render')(carbonAdsService);
    expect(wrapper.find(<CarbonAdsMetaTags carbonAdsService={carbonAdsService} />));
  });
});
