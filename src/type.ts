interface NestedDir {
    dir: string;
    parents: string[];
}

interface FrontMatter {
    fungsional: string;
    gambar: Array<{
      childImageSharp: any
    }> | [];
    super_admin: string;
    admin: string;
    mentor: string;
    teacher: string;
    partner: string;
    lead_program: string;
    lead_region: string;
    content_writer: string;
    industri: string;
    student: string;
    support_mobile: string;
}  

interface Data {
    docs: {
      edges: Array<{
        node: {
          html: string;
          frontmatter: FrontMatter;
          id: string;
        };
      }>;
    };
  }
  
export {Data, FrontMatter, NestedDir}