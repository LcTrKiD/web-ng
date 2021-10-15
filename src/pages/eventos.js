import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/SEO';
import Layout from '../components/Layout';
import FeaturedEvents from '../components/FeaturedEvents';
import EventPost from '../components/EventPost';

const Eventos = (props) => {
    const featuredEvents = props.data.featuredEvents.edges.map(({ node }) => {
        return {
            id: node.id,
            image: node.frontmatter.image,
            link: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.fullDate,
            logo: node.frontmatter.logo,
            text: node.excerpt,
        };
    });
    const nonFeaturedEvents = props.data.nonFeaturedEvents.edges.map(({ node }) => {
        return {
            id: node.id,
            image: node.frontmatter.image,
            link: node.fields.slug,
            title: node.frontmatter.title,
            date: node.frontmatter.fullDate,
            logo: node.frontmatter.logo,
        };
    });

    return (
        <Layout bodyClass='page-default-single'>
            <SEO title='Eventos' />           
            <div className='container mt-6'>
                 <h1 className='title'>Eventos</h1>
            </div>
                <FeaturedEvents eventos={featuredEvents} />

            <div className='container mt-3'>
                <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mx-n2'>
                    {nonFeaturedEvents.map(evento => (
                    <EventPost evento={evento} key={evento.id}/>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export const query = graphql`
    query EventosQuery {
        featuredEvents: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/eventos/.*/" }, frontmatter: { featured: {eq: true}} }
            sort: { fields: [frontmatter___date], order: ASC }
        ) {
            edges {
                node {
                    id
                    excerpt
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featured
                        image
                        fullDate
                        logo
                    }
                }
            }
        }
        nonFeaturedEvents: allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/eventos/.*/" }, frontmatter: { featured: {eq: false}} }
            sort: { fields: [frontmatter___date], order: DESC }
        ) {
            edges {
                node {
                    id
                    excerpt (pruneLength: 500)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featured
                        image
                        fullDate
                        logo
                    }
                    internal {
                        content
                    }
                }
            }
        }
    }
`;

export default Eventos;
