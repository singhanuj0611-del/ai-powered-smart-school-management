# 🎓 EduAI - Smart School Management System

**EduAI** is a modern, AI-powered school management platform built entirely in React.js. It helps teachers and administrators save time by automating lesson planning, assignment creation, and student record management—all with a beautiful, responsive interface featuring glassmorphism design and smooth animations.

![EduAI Platform](https://img.shields.io/badge/React-19.2.0-blue) ![License](https://img.shields.io/badge/License-ISC-green) ![Status](https://img.shields.io/badge/Status-Active-success)
 
---

## 🚀 Features

### 🧭 Core Management Modules

#### 📊 **Dashboard**
- **Overview Metrics**: Real-time display of key school statistics
  - Total students enrolled
  - Attendance percentage
  - Pending assignments count
  - Recent activity timeline
- **Visual Analytics**: Color-coded cards with animated counters
- **Quick Actions**: Fast access to common tasks

#### 👥 **Student Management**
- **CRUD Operations**: Add, edit, and delete student records seamlessly
- **Instant Search**: Real-time filtering by name, grade, or ID
- **Student Profiles**: View detailed information including:
  - Name, ID, Grade, Email
  - Enrollment date
  - Current status
- **Responsive Grid Layout**: Beautiful card-based interface with hover effects
- **Data Persistence**: Changes saved to local state (ready for backend integration)

#### 📅 **Attendance Tracking**
- **Weekly Grid View**: Interactive calendar for marking attendance
- **Visual Statistics**:
  - Total attendance percentage
  - Present/Absent counts
  - Weekly trends
- **Color-Coded Status**: 
  - 🟢 Present (green)
  - 🔴 Absent (red)
  - ⚪ Not marked (gray)
- **Quick Toggle**: Click to mark/unmark attendance
- **Export Ready**: Data structure prepared for reporting

#### ⚙️ **Settings**
- **OpenAI API Key Management**: Secure storage for AI features
- **Dark Mode Toggle**: Switch between dark and light themes
- **Preferences**:
  - Auto-reports generation
  - Notification settings
- **Theme Persistence**: Settings saved across sessions

---

### 🤖 AI-Powered Tools

#### 📝 **Lesson Planner**
Generate complete, ready-to-teach lesson plans powered by OpenAI GPT models.

**Features:**
- **Customizable Inputs**:
  - Subject selection (Science, Math, English, etc.)
  - Topic specification
  - Grade level (6-9)
  
- **AI-Generated Content**:
  - **Learning Objectives**: 3-4 clear, measurable goals
  - **Materials Required**: List of resources and tools needed
  - **Engaging Activities**: Step-by-step activity descriptions
  - **Assessment Methods**: Formative and summative evaluation strategies

- **Smart Formatting**: Structured JSON output parsed and displayed beautifully
- **Error Handling**: Graceful fallbacks and user-friendly error messages

**Usage:**
1. Navigate to "Lesson Planner" from the main menu
2. Fill in Subject, Topic, and Grade Level
3. Click "Create Lesson Plan"
4. Review the AI-generated plan with objectives, materials, activities, and assessments

#### 📚 **Assignment Generator**
Create comprehensive assignments with questions of varying difficulty levels.

**Features:**
- **Difficulty Levels**: Easy, Medium, Hard
- **Question Types**: Multiple choice, short answer, essay prompts
- **Complete Solutions**:
  - Answer key for each question
  - Detailed explanations
  - Grading rubrics (where applicable)

- **AI-Generated Content**:
  - Contextually appropriate questions
  - Age-appropriate language
  - Progressive difficulty
  - Real-world applications

- **Export Options**: Copy-ready format for printing or digital distribution

**Usage:**
1. Go to "Assignment Generator"
2. Select difficulty level (Easy/Medium/Hard)
3. Enter subject and topic
4. Click "Generate Assignment"
5. Review questions with answers and explanations

#### 💬 **AI Chat Assistant**
A floating chatbot that provides instant teaching support and curriculum guidance.

**Features:**
- **Always Available**: Floating button in bottom-right corner
- **Conversation History**: Maintains context throughout the session
- **Teaching Support**:
  - Curriculum suggestions
  - Lesson ideas
  - Student engagement tips
  - Classroom management advice
  - Differentiation strategies

- **Smart Responses**: Context-aware answers powered by GPT-4o-mini
- **Quick Actions**: Minimize/maximize chat window
- **Typing Indicators**: Visual feedback during AI processing

**Usage:**
1. Click the chat icon in the bottom-right corner
2. Type your question or request
3. Receive instant AI-powered guidance
4. Continue the conversation with follow-up questions

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Parcel Bundler 1.12.5
- **AI Integration**: OpenAI API (GPT-4o-mini)
- **Styling**: Inline CSS with glassmorphism effects
- **Animations**: CSS transitions and transforms
- **State Management**: React Hooks (useState, useMemo)

---

## 📦 Installation

### Prerequisites
- **Node.js**: Version 12.20.1 or higher (Node 14+ recommended)
- **npm**: Version 6.14.10 or higher
- **OpenAI API Key**: Get yours from [OpenAI Platform](https://platform.openai.com/api-keys)

### Step-by-Step Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd eduai-smart-school
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

4. **Open your browser**
   - Parcel will automatically open `http://localhost:1234`
   - If not, navigate manually to the URL shown in the terminal

---

## 🔑 Configuration

### Setting Up OpenAI API Key

1. **Get Your API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com)
   - Sign up or log in
   - Navigate to API Keys section
   - Create a new secret key
   - Copy the key (it starts with `sk-`)

2. **Add Key to EduAI**:
   - Click on "Settings" in the main navigation
   - Paste your OpenAI API key in the "OpenAI API Key" field
   - The key is stored locally in your browser (not sent to any server)

3. **Verify Setup**:
   - Try generating a lesson plan or assignment
   - If successful, you'll see AI-generated content
   - If you see an error, double-check your API key

### API Key Security Notes
- ⚠️ **Never commit your API key to version control**
- 🔒 Keys are stored in browser localStorage
- 💰 OpenAI charges per API call (check [pricing](https://openai.com/pricing))
- 🎯 The app uses `gpt-4o-mini` model for cost efficiency

---

## 📖 Usage Guide

### Getting Started

1. **First Launch**:
   - The app opens to the Dashboard
   - Review the overview metrics
   - Explore the navigation menu

2. **Configure Settings**:
   - Go to Settings
   - Add your OpenAI API key
   - Toggle dark mode if preferred
   - Enable/disable notifications

3. **Start Using AI Features**:
   - Generate your first lesson plan
   - Create an assignment
   - Chat with the AI assistant

### Module Navigation

Use the navigation buttons at the top to switch between modules:
- **Dashboard**: Overview and metrics
- **Students**: Manage student records
- **Attendance**: Track weekly attendance
- **Lesson Planner**: Generate AI lesson plans
- **Assignment Generator**: Create assignments
- **Settings**: Configure app preferences

### Tips for Best Results

**Lesson Planner**:
- Be specific with topics (e.g., "Photosynthesis" vs "Biology")
- Include grade level for age-appropriate content
- Review and customize generated plans

**Assignment Generator**:
- Start with "Medium" difficulty for balanced questions
- Use "Hard" for advanced students
- Copy questions to your LMS or document editor

**AI Chat Assistant**:
- Ask specific questions for better answers
- Use it for brainstorming lesson ideas
- Request differentiation strategies for diverse learners

---

## 📁 Project Structure

```
eduai-smart-school/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx              # Main dashboard with metrics
│   │   ├── StudentManagement.jsx      # Student CRUD operations
│   │   ├── AttendanceTracker.jsx      # Weekly attendance grid
│   │   ├── LessonPlanner.jsx          # AI lesson plan generator
│   │   ├── AssignmentGenerator.jsx    # AI assignment creator
│   │   ├── Settings.jsx               # App configuration
│   │   └── AIChatAssistant.jsx        # Floating chat widget
│   ├── data/
│   │   └── mockData.js                # Sample data for development
│   ├── utils/
│   │   └── openAI.js                  # OpenAI API integration
│   ├── App.jsx                        # Main app component
│   ├── index.jsx                      # React entry point
│   └── index.html                     # HTML template
├── package.json                       # Dependencies and scripts
└── README.md                          # This file
```

---

## 🎨 Design Features

### Glassmorphism UI
- **Frosted Glass Effect**: Translucent panels with backdrop blur
- **Layered Depth**: Multiple z-index levels for visual hierarchy
- **Smooth Transitions**: Animated state changes

### Dark Mode
- **Default Theme**: Beautiful dark gradient background
- **Light Mode**: Clean, bright interface option
- **Seamless Switching**: Instant theme changes

### Animations
- **Hover Effects**: Interactive button and card animations
- **Loading States**: Visual feedback during AI processing
- **Smooth Transitions**: 0.25s-0.6s ease transitions

---

## 🚧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run start

# Build for production
npm run build
```

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with optimized, minified files ready for deployment.

### Adding New Features

1. **Create Component**: Add new `.jsx` files in `src/components/`
2. **Register Module**: Add to `modules` array in `App.jsx`
3. **Style Inline**: Use inline styles with glassmorphism patterns
4. **Test Locally**: Use `npm run start` for development

---

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Backend API integration for data persistence
- [ ] User authentication and multi-user support
- [ ] Export lesson plans to PDF
- [ ] Gradebook integration
- [ ] Parent portal
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with popular LMS platforms

---

## 🐛 Troubleshooting

### Common Issues

**"Missing OpenAI API key" error**:
- Go to Settings and add your API key
- Ensure the key starts with `sk-`
- Check that you haven't exceeded your OpenAI quota

**Parcel build errors**:
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 12+)

**AI responses not generating**:
- Verify API key is correct
- Check browser console for errors
- Ensure you have OpenAI API credits
- Try refreshing the page

**Styles not loading**:
- Clear browser cache
- Restart the development server
- Check that inline styles are properly formatted

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📧 Support

For questions, issues, or feature requests:
- Check the troubleshooting section above
- Review OpenAI API documentation
- Open an issue in the repository

---

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API
- **React Team** for the amazing framework
- **Parcel** for the zero-config bundler

---

## 📊 Version History

- **v1.0.0** (Current)
  - Initial release
  - All core modules implemented
  - OpenAI integration complete
  - Glassmorphism UI design
  - Dark mode support

---

**Made with ❤️ for educators everywhere**

*EduAI - Empowering teachers, one lesson at a time.*

