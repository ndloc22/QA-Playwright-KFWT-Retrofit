const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DEMO_DIR = path.join(__dirname, 'demo-app');
const TICKETS_DIR = path.join(__dirname, 'docs', 'tickets');

if (!fs.existsSync(TICKETS_DIR)) {
  fs.mkdirSync(TICKETS_DIR, { recursive: true });
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Private-Network', 'true');
}

const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API: Save Jira Ticket
  if (req.url === '/api/save-ticket' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const key = (data.key || 'TICKET-' + Date.now()).toUpperCase().trim();
        const mdPath = path.join(TICKETS_DIR, `${key}.md`);
        const jsonPath = path.join(TICKETS_DIR, `${key}.json`);

        let mdContent = data.markdown;
        if (!mdContent) {
          // Comments & Discussion — nguồn Resolution Authority: khi PO/Dev đã chốt cách xử lý
          // mâu thuẫn nghiệp vụ (vd 1 task vs 2 task) ngay trong Jira Comments, khối này giúp
          // /analyze-story và /new-test đọc được thỏa thuận mới nhất thay vì chỉ dựa Description/AC.
          const comments = Array.isArray(data.comments) ? data.comments : [];
          let commentsSection = '';
          if (comments.length) {
            commentsSection = `---\n\n## 💬 Jira Comments & Discussion\n\n` +
              comments.map((c, i) => {
                const dateStr = c.created ? new Date(c.created).toLocaleString('vi-VN') : 'N/A';
                return `**#${i + 1} — ${c.author || 'Unknown'}** _(${dateStr})_\n\n${c.body || ''}\n`;
              }).join('\n---\n\n') + '\n\n';
          }

          mdContent = `# [${key}] ${data.summary || 'Untitled Jira Ticket'}\n\n` +
            `| Thuộc tính | Giá trị |\n` +
            `| :--- | :--- |\n` +
            `| **Key** | \`${key}\` |\n` +
            `| **Loại (Issue Type)** | ${data.issueType || 'Story'} |\n` +
            `| **Trạng thái (Status)** | \`${data.status || 'To Do'}\` |\n` +
            `| **Độ ưu tiên (Priority)** | ${data.priority || 'Medium'} |\n` +
            `| **Người thực hiện (Assignee)** | ${data.assignee || 'Unassigned'} |\n` +
            `| **Người tạo (Reporter)** | ${data.reporter || 'N/A'} |\n` +
            `| **Sprint** | ${data.sprint || 'Grids Ampere 26-17'} |\n` +
            `| **Story Points** | ${data.storyPoints !== null && data.storyPoints !== undefined ? data.storyPoints : 'N/A'} |\n` +
            `| **Jira URL** | [${data.url || `https://jira.eon.com/browse/${key}`}](${data.url || `https://jira.eon.com/browse/${key}`}) |\n` +
            `| **Synced At** | \`${new Date().toISOString()}\` |\n\n` +
            `---\n\n` +
            `## 📝 Description\n\n${data.description || '*(No description provided)*'}\n\n` +
            `---\n\n` +
            `## 🎯 Acceptance Criteria (AC)\n\n${data.acceptanceCriteria || '*(See description above)*'}\n\n` +
            (commentsSection || `---\n\n`) +
            `## 🤖 Copilot Automation Context\n` +
            `- **Target Spec Path**: \`tests/e2e/TC-${key}.spec.ts\`\n` +
            `- **Test Plan Path**: \`tests/testcases/TC-${key}.md\`\n` +
            `- **Related Confluence Docs**: Check \`docs/specs/index.yaml\`\n`;
        }

        fs.writeFileSync(mdPath, mdContent, 'utf-8');
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

        console.log(`\x1b[32m[TICKET SYNC]\x1b[0m Saved ticket ${key} -> docs/tickets/${key}.md`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          key: key,
          file: `docs/tickets/${key}.md`,
          message: `Ticket ${key} saved successfully to Retrofit project!`
        }));
      } catch (err) {
        console.error('Error parsing/saving ticket:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
    return;
  }

  // API: List saved tickets
  if (req.url === '/api/tickets' && req.method === 'GET') {
    try {
      const files = fs.readdirSync(TICKETS_DIR).filter(f => f.endsWith('.json'));
      const tickets = files.map(f => {
        try {
          return JSON.parse(fs.readFileSync(path.join(TICKETS_DIR, f), 'utf-8'));
        } catch {
          return { key: f.replace('.json', '') };
        }
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ count: tickets.length, tickets }));
      return;
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
      return;
    }
  }

  // Static files
  let reqPath = req.url.split('?')[0];
  let filePath = path.join(DEMO_DIR, reqPath === '/' ? 'index.html' : reqPath);
  const ext = path.extname(filePath);

  let contentType = 'text/html';
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.css') contentType = 'text/css';
  if (ext === '.json') contentType = 'application/json';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.svg') contentType = 'image/svg+xml';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 E.ON KFWT Retrofit Portal running at http://127.0.0.1:${PORT}/`);
  console.log(`⚡ Ticket Sync Endpoint live at http://127.0.0.1:${PORT}/api/save-ticket`);
});
