# Admin Settings Panel Guide

## Overview

Your dashboard now includes a powerful **PIN-protected admin settings panel** where you can:
- ✅ Add, edit, and delete applications
- ✅ Manage categories (add, edit, delete, customize icons)
- ✅ Change the admin PIN
- ✅ All changes persist in browser localStorage

---

## Accessing Settings

### Step 1: Click the Settings Button
- Look for the ⚙️ Settings button in the top-right header
- Click it to open the PIN entry modal

### Step 2: Enter Admin PIN
- **Default PIN:** `1234`
- Enter the PIN and click "Unlock"
- Incorrect PIN will show an error and shake the input

### Step 3: Settings Panel Opens
You'll see three tabs:
1. **Applications** - Manage your apps
2. **Categories** - Manage categories
3. **Security** - Change your PIN

---

## Managing Applications

### Add a New Application

1. Click the "Add App" button in the Applications tab
2. Fill in the form:
   - **App Name** (required): e.g., "GitHub"
   - **URL** (required): e.g., "https://github.com"
   - **Description** (required): Short description
   - **Category** (required): Select from dropdown
   - **Color** (required): Pick a color or enter hex code
   - **Version** (optional): e.g., "1.0.0"
   - **Installed** (checkbox): Check if installed
3. Click "Add App"

The app will immediately appear in your dashboard!

### Edit an Existing Application

1. Find the app in the list
2. Click the ✏️ Edit button
3. Modify any fields
4. Click "Update App"

### Delete an Application

1. Find the app in the list
2. Click the 🗑️ Delete button
3. Confirm the deletion

**Warning:** Deletion is permanent!

---

## Managing Categories

### View Current Categories

The Categories tab shows all your existing categories with:
- Icon (emoji)
- Label (display name)
- Type (internal identifier)

### Edit a Category

1. Click the ✏️ Edit button on a category
2. Modify the icon or label
3. Click the ✓ Save button

**Note:** You cannot change the category type as it's linked to existing apps

### Delete a Category

1. Click the 🗑️ Delete button
2. The category is removed from filters

**Warning:** Apps using this category will still display, but the filter will be gone

### Add a New Category

1. Click the "Add Category" button
2. Fill in:
   - **Icon**: An emoji (e.g., 🎮)
   - **Label**: Display name (e.g., "Gaming")
   - **Type**: Internal identifier (e.g., "gaming")
3. Click the ✓ Save button
4. Click "Save Changes" to persist

**Important:** The type must be unique and lowercase with no spaces

### Save Category Changes

After making changes, click **"Save Changes"** at the bottom to persist them.

Click **"Reset"** to revert all unsaved changes.

---

## Changing Your PIN

### Update Admin PIN

1. Go to the "Security" tab
2. You'll see your current PIN (displayed for reference)
3. Enter a new PIN (minimum 4 characters)
4. Confirm the new PIN
5. Click "Update PIN"

### PIN Requirements

- Minimum 4 characters
- Can be numbers, letters, or special characters
- Both entries must match

**Important:** Don't forget your PIN! There's no recovery method (it's stored in localStorage).

---

## Data Persistence

All changes are automatically saved to browser localStorage:

- **Applications:** Stored as `dashboard_apps`
- **Categories:** Stored as `dashboard_categories`
- **Admin PIN:** Stored as `dashboard_pin`

### Clearing Data

To reset to defaults:
1. Open browser console (F12)
2. Run:
   ```javascript
   localStorage.removeItem('dashboard_apps');
   localStorage.removeItem('dashboard_categories');
   localStorage.removeItem('dashboard_pin');
   location.reload();
   ```

---

## Tips & Best Practices

### App Management

✅ **Use descriptive names** - Make apps easy to identify
✅ **Choose brand colors** - Use the app's official color for recognition
✅ **Keep descriptions concise** - One line is enough
✅ **Mark installed correctly** - Shows correct button ("Launch" vs "Install")
✅ **Use valid URLs** - Test them before adding

### Category Management

✅ **Use clear emojis** - Make categories visually distinct
✅ **Keep labels short** - 1-2 words work best
✅ **Use lowercase types** - e.g., "gaming" not "Gaming"
✅ **No spaces in types** - Use hyphens: "game-dev" not "game dev"
✅ **Unique types** - Each type must be different

### Security

✅ **Change default PIN** - Don't use "1234" in production
✅ **Use memorable PIN** - You can't reset it!
✅ **Log out when done** - Close settings panel after changes

---

## Common Tasks

### Task: Add Multiple Apps Quickly

1. Click "Add App"
2. Fill form and save
3. Repeat for each app
4. All apps are immediately available

### Task: Reorganize Categories

1. Go to Categories tab
2. Edit icons and labels to match your preference
3. Delete unused categories
4. Add new ones as needed
5. Click "Save Changes"

### Task: Bulk Update App Colors

Unfortunately, there's no bulk update. Edit each app individually.

### Task: Backup Your Data

1. Open browser console (F12)
2. Copy localStorage data:
   ```javascript
   console.log(JSON.stringify({
     apps: localStorage.getItem('dashboard_apps'),
     categories: localStorage.getItem('dashboard_categories'),
     pin: localStorage.getItem('dashboard_pin')
   }));
   ```
3. Save the output somewhere safe

### Task: Restore Backup

1. Open browser console (F12)
2. Paste and run:
   ```javascript
   localStorage.setItem('dashboard_apps', 'PASTE_APPS_DATA_HERE');
   localStorage.setItem('dashboard_categories', 'PASTE_CATEGORIES_DATA_HERE');
   localStorage.setItem('dashboard_pin', 'PASTE_PIN_HERE');
   location.reload();
   ```

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Close any modal | `Esc` |
| Submit form | `Enter` (in input fields) |

---

## Troubleshooting

### Can't Access Settings

**Problem:** Forgot PIN
**Solution:** Clear localStorage and reload (PIN resets to "1234")

### Changes Not Saving

**Problem:** Click "Save Changes" in Categories tab
**Solution:** Make sure to click the save button, not just edit

### Apps Not Appearing

**Problem:** Check category filter
**Solution:** Clear filters using "Clear" button in sidebar

### Category Disappeared

**Problem:** Deleted by accident
**Solution:** Add it back in Categories tab or restore from backup

---

## Security Notes

- PIN is stored in plain text in localStorage
- This is suitable for personal use, not production environments
- Anyone with browser access can clear localStorage
- No backend authentication - client-side only

For production use, consider:
- Server-side authentication
- Encrypted storage
- User accounts
- Audit logs

---

## Feature Summary

| Feature | Status | Location |
|---------|--------|----------|
| Add apps | ✅ Working | Applications tab |
| Edit apps | ✅ Working | Applications tab |
| Delete apps | ✅ Working | Applications tab |
| Add categories | ✅ Working | Categories tab |
| Edit categories | ✅ Working | Categories tab |
| Delete categories | ✅ Working | Categories tab |
| Change PIN | ✅ Working | Security tab |
| PIN protection | ✅ Working | Settings button |
| Auto-save | ✅ Working | All changes |
| Persist data | ✅ Working | localStorage |

---

## Default Configuration

**Default PIN:** 1234

**Default Categories:**
- 📊 Productivity
- 💻 Development
- 🎨 Design
- 💬 Communication
- 🎵 Media
- 🔧 Utility
- 🗄️ Database
- 📈 Analytics

**Sample Apps:** 12 pre-loaded applications

---

## Support

Need help? Check:
- [QUICK_EDIT_GUIDE.md](QUICK_EDIT_GUIDE.md) - For manual editing
- [MANAGING_APPS.md](MANAGING_APPS.md) - For detailed documentation
- [EXAMPLES.md](EXAMPLES.md) - For real-world examples

---

Happy managing! 🎉
