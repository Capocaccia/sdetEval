export default async function handler(req, res) {
    const fields = [
      'title',
      'date',
      'slug',
      'author',
      'ogImage',
      'coverImage',
      'excerpt',
      'content'
    ];
    const slug = req.query.slug;
    const isMock = req.query.isMock || "true";
    const fs = require('fs');
    const p = require('path');
    const matter = require('gray-matter')

    const realSlug = slug.replace(/\.md$/, '')
    const folder = isMock == "true" ? 'pages/mocks/_posts' : '_posts'
    const postsDirectory = p.join(process.cwd(), folder)

    var fileEmpty = false;

    do {
      var fullPath = p.join(postsDirectory, `${realSlug}.md`);

      if (isMock == "true" && (!fs.existsSync(fullPath) || fileEmpty)) {
        fullPath = p.join(p.join(process.cwd(), '_posts'), `${realSlug}.md`);
      }
  
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      if (content.trim() == "" || Object.keys(data).length == 0) {
        fileEmpty = true;
        continue;
      } else {
        fileEmpty = false;
      }
    
      const items = {}
    
      // Ensure only the minimal needed data is exposed
      fields.forEach((field) => {
        if (field === 'slug') {
          items[field] = realSlug
        }
        if (field === 'content') {
          items[field] = content
        }
    
        if (typeof data[field] !== 'undefined') {
          items[field] = data[field]
        }
      })

      res.status(200).json(items);
    } while (fileEmpty);
  }
