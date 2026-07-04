# Life Calendar

A modern, minimalist web widget that visualizes your life as weeks. Each square represents one week of your life, providing a unique perspective on how your time is distributed across your lifespan.

## Features

- **Visual Life Timeline**: Display your entire life as a grid of 4,680 weeks (90 years × 52 weeks)
- **Real-time Statistics**: Automatically calculates:
  - Current age
  - Weeks lived
  - Weeks remaining
  - Life progress percentage
  - Days until next birthday
- **Animated Progress Bar**: Smooth animation showing your overall life progress
- **Interactive Tooltips**: Hover over any week to see:
  - Week number
  - Date range
  - Your age during that week
- **Dark Mode Support**: Automatically adapts to your system theme preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and ARIA labels
- **No Dependencies**: Pure HTML5, CSS3, and vanilla JavaScript
- **Static Site**: No backend or server required

## Color Scheme

- **Green (#22c55e)**: Weeks lived
- **Orange (#f59e0b)**: Current week
- **Gray (#2d3748)**: Future weeks

## Getting Started

### Prerequisites
- Git account
- GitHub Pages enabled repository

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `life-calendar`
3. Choose "Public"
4. Do not initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Upload Files to GitHub

You have two options:

#### Option A: Command Line (Git)
```bash
git clone https://github.com/YOUR-USERNAME/life-calendar.git
cd life-calendar
# Copy all project files here (index.html, style.css, script.js, README.md, LICENSE, .nojekyll)
git add .
git commit -m "Initial commit"
git push origin main
```

#### Option B: Web Interface
1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop all project files:
   - index.html
   - style.css
   - script.js
   - README.md
   - LICENSE
   - .nojekyll

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section (usually at Settings → Pages)
3. Under "Build and deployment":
   - Source: Select "Deploy from a branch"
   - Branch: Select "main" (or "master")
   - Folder: Select "/ (root)"
4. Click "Save"
5. GitHub will display your live URL (usually `https://YOUR-USERNAME.github.io/life-calendar/`)

### Step 4: Embed in Notion

1. Open your Notion page
2. Type `/embed`
3. Click "Embed link"
4. Paste your GitHub Pages URL: `https://YOUR-USERNAME.github.io/life-calendar/`
5. Click "Embed"

The widget will now display in your Notion page and automatically update based on the current date.

## Customization

To use with your own birth date and life expectancy:

1. Open `script.js`
2. Find these lines at the top:
   ```javascript
   const BIRTH_DATE = new Date(1998, 7, 10); // August 10, 1998
   const LIFE_EXPECTANCY = 90; // years
   ```
3. Update:
   - `BIRTH_DATE`: Change the date (month is 0-indexed, so 7 = August)
   - `LIFE_EXPECTANCY`: Change the expected lifespan in years
4. Commit and push the changes

The page will automatically recalculate all statistics.

## File Structure

```
life-calendar/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Logic and calculations
├── README.md       # This file
├── LICENSE         # MIT License
└── .nojekyll       # Tells GitHub Pages to not process Jekyll
```

## How It Works

- **Automatic Calculations**: Every value (age, weeks, progress) is calculated from your birth date
- **Dynamic Grid**: The 4,680 weeks are generated on page load using JavaScript
- **Real-time Updates**: Statistics refresh every minute to account for day changes
- **Responsive Layout**: CSS Grid adapts to different screen sizes
- **Dark Mode**: Uses `prefers-color-scheme` media query for automatic theme detection

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Performance

- Lightweight: ~50KB total (uncompressed)
- No external dependencies
- Smooth animations with GPU acceleration
- Minimal runtime calculations

## Accessibility

- Keyboard navigation support
- ARIA labels on all interactive elements
- High contrast colors
- Focus indicators visible
- Works with screen readers

## License

MIT License - See LICENSE file for details

## Built with ❤️

A personal project to visualize and appreciate the finite nature of life, inspired by GitHub's contribution graph.

---

## Troubleshooting

### Page shows "--" for statistics
- Wait a moment for JavaScript to load and calculate
- Ensure JavaScript is enabled in your browser

### Grid doesn't display
- Check browser console for errors (F12)
- Ensure all files are in the same directory
- Clear browser cache and reload

### Tooltip not working
- Ensure JavaScript is enabled
- Try a different browser
- Check that `script.js` is properly linked

### GitHub Pages not updating
- GitHub Pages can take 1-2 minutes to deploy
- Try clearing browser cache
- Check that `.nojekyll` file is present

## Future Enhancements (Optional)

- Export as image
- Multiple person support
- Statistics comparison
- Week annotations
- Analytics integration

---

For updates and issues, visit: https://github.com/YOUR-USERNAME/life-calendar
