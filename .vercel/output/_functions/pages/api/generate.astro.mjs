import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
import { v6 } from 'uuid';
export { renderers } from '../../renderers.mjs';

const systemPrompt = () => "You are an expert and a professional UI/UX designer and product design system specialist with over 10 years of experience. Your role is to generate low-fidelity wireframes based on user inputs, adhering to industry best practices like consistent padding and margins using a 4-point grid system. Typographic hierarchy follows 'Major Third,' 'Perfect Fourth,' and other scales.  Ensure wireframes are efficient, clean, and optimized for user journeys. Make sure that all your wireframe designs follow standard UX principles. Deliver wireframes in greyscale color scheme depending on the component hierarchy and this need not be explained in the text response. Maintain the design to 13 inch screen (desktop) unless the responsiveness requirements are specified by the user.\n\nYour role is to:\n- Apply established design patterns and best practices\n- Provide clear rationale for design decisions\n- Maintain design consistency across all screens\n\nFollow the below standards:\n- Visual Hierarchy: Clear content prioritization\n- Consistency: Uniform patterns and components and also maintain alignment. Make sure there are no overlapping components in the design. Always center align the button labels\n- Scalability: Design patterns that can evolve\n- Memory and Context: When a user references previous wireframe, retain the complete SVG wireframe output in memory and only modify the components mentioned by the user\n- Graphics: Add proper graphical elements like charts, graphs, tables, placeholder images wherever required. Make sure that these elements do not overlap. \nOverall, maintain a balance between form and functionality, aesthetics and usability while designing wireframes.";
const examples = {
  type: "text",
  text: '<examples>\n<example>\n<project_name>\nLogin Screen\n</project_name>\n<user_journey>\nI want to create an onboarding page for a new user with three pages\n</user_journey>\n<user_persona>\nConsumer of goods\n</user_persona>\n<project_brief>\nI want to create a login page where I can enter username and password and login to the platform\n</project_brief>\n<ideal_output>\n<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">\n        <image href="data:image/png;base64,{base64_data}" width="{width}" height="{height}" />\n    </svg>\n</ideal_output>\n</example>\n<example>\n<project_name>\nTravel Website\n</project_name>\n<user_journey>\nUser logs in to the website using their phone after successful OTP verification. They land on the landing home page of the website. On the landing page, at the top, there is a top navigation bar. The nav bar is followed by a prominent hero area. After that, they are able to some of the frequently traveled journey cards, social proofing like reviews and stats about the company. Also, there is a footer section. \n</user_journey>\n<user_persona>\nPrimary User: Travelers\nDemographics: Ages 18–55, tech-savvy individuals, frequent travelers, solo adventurers, or families.\nBehaviors: Regular use of travel apps/websites, price-sensitive, values user reviews and recommendations.\nGoals:\nPlan trips efficiently.\nDiscover new destinations.\nFind affordable and reliable options for travel and stay.\nAccess accurate and up-to-date travel guides and tips.\nPain Points:\nLack of cohesive trip planning tools.\nUncertain costs and hidden fees.\nDifficulty in accessing authentic travel information.\n</user_persona>\n<project_brief>\nThe Travel Website is an online platform designed to assist users in planning, booking, and managing their travel experiences seamlessly. The website offers features such as destination search, itinerary planning, flight and accommodation bookings, travel guides, and personalized recommendations. The goal is to enhance user experience by providing a one-stop solution for all travel needs.\n</project_brief>\n<ideal_output>\n<svg xmlns="http://www.w3.org/2000/svg" width="{img.width}" height="{img.height}" viewBox="0 0 {img.width} {img.height}">\n  <image href="{os.path.basename(input_path)}" width="{img.width}" height="{img.height}" />\n</svg>\n</ideal_output>\n</example>\n<example>\n<project_name>\nTravel Website\n</project_name>\n<user_journey>\nUser lands on the home page. They click on the leading short list shown on the home page. They are redirected to the destination listing page which has the complete list of all the travel itineraries and packages. The listing page includes a search bar at the top along with comprehensive list of filters. Each trip is displayed as a thumbnail with key details mentioned on each tile. The image placeholder for each destination card should be in the ratio of 3:4 \n</user_journey>\n<user_persona>\nPrimary User: Travelers\nDemographics: Ages 18–55, tech-savvy individuals, frequent travelers, solo adventurers, or families.\nBehaviors: Regular use of travel apps/websites, price-sensitive, values user reviews and recommendations.\nGoals:\nPlan trips efficiently.\nDiscover new destinations.\nFind affordable and reliable options for travel and stay.\nAccess accurate and up-to-date travel guides and tips.\nPain Points:\nLack of cohesive trip planning tools.\nUncertain costs and hidden fees.\nDifficulty in accessing authentic travel information.\n</user_persona>\n<project_brief>\nThe Travel Website is an online platform designed to assist users in planning, booking, and managing their travel experiences seamlessly. The website offers features such as destination search, itinerary planning, flight and accommodation bookings, travel guides, and personalized recommendations. The goal is to enhance user experience by providing a one-stop solution for all travel needs.\n</project_brief>\n<ideal_output>\n<svg xmlns="http://www.w3.org/2000/svg" width="{image.width}" height="{image.height}" viewBox="0 0 {image.width} {image.height}">\n  <image href="data:image/png;base64,{image.tobytes().hex()}" width="{image.width}" height="{image.height}" />\n</svg>\n</ideal_output>\n</example>\n<example>\n<project_name>\nEcommerce Application\n</project_name>\n<user_journey>\nUser selects products from the product listing page and adds them to cart. User access the cart page to view all the products that are added to cart. This should have product details like price, quantity, placeholder image, check out option and delete option. At the bottom, user should be able to change the delivery location for that particular order. Also, the total cart value should be at the bottom with continue to payment button. \n</user_journey>\n<user_persona>\nCustomer who wants to order groceries\n</user_persona>\n<project_brief>\nCustomers are able to login to the app, browse through the products listed, add products to cart, check out , make payment and track the delivery. \n</project_brief>\n<ideal_output>\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 800" width="400" height="800">\n  <!-- Background -->\n  <rect width="400" height="800" fill="#FFFFFF" />\n  <!-- Header -->\n  <rect x="20" y="20" width="80" height="16" rx="4" fill="#E0E0E0" /> <!-- Back Icon -->\n  <rect x="160" y="20" width="80" height="16" rx="4" fill="#E0E0E0" /> <!-- Header Title -->\n  <!-- Savings Banner -->\n  <rect x="20" y="60" width="360" height="80" rx="8" fill="#F7F8FC" />\n  <rect x="40" y="75" width="200" height="15" rx="4" fill="#FF4D4F" /> <!-- Savings Text -->\n  <circle cx="320" cy="100" r="20" fill="#FFDAD6" /> <!-- Discount Icon -->\n  <!-- Coupon Section -->\n  <rect x="40" y="110" width="80" height="12" rx="4" fill="#D9D9D9" />\n  <rect x="40" y="130" width="140" height="12" rx="4" fill="#D9D9D9" />\n  <!-- Product Cards -->\n  <rect x="20" y="160" width="360" height="100" rx="8" fill="#F7F8FC" />\n  <rect x="40" y="175" width="60" height="60" rx="8" fill="#E0E0E0" /> <!-- Product Image -->\n  <rect x="110" y="175" width="200" height="15" rx="4" fill="#333333" /> <!-- Product Title -->\n  <rect x="110" y="195" width="100" height="12" rx="4" fill="#D9D9D9" /> <!-- Price -->\n  <rect x="110" y="215" width="140" height="12" rx="4" fill="#F7C7C6" /> <!-- Discount Info -->\n  <rect x="300" y="180" width="50" height="12" rx="4" fill="#D9D9D9" /> <!-- Remove Button -->\n  <!-- Repeated Product Card -->\n  <rect x="20" y="270" width="360" height="100" rx="8" fill="#F7F8FC" />\n  <rect x="40" y="285" width="60" height="60" rx="8" fill="#E0E0E0" /> <!-- Product Image -->\n  <rect x="110" y="285" width="200" height="15" rx="4" fill="#333333" /> <!-- Product Title -->\n  <rect x="110" y="305" width="100" height="12" rx="4" fill="#D9D9D9" /> <!-- Price -->\n  <rect x="110" y="325" width="140" height="12" rx="4" fill="#F7C7C6" /> <!-- Discount Info -->\n  <rect x="300" y="290" width="50" height="12" rx="4" fill="#D9D9D9" /> <!-- Remove Button -->\n  <!-- Delivery Section -->\n  <rect x="20" y="380" width="360" height="80" rx="8" fill="#F7F8FC" />\n  <rect x="40" y="400" width="240" height="15" rx="4" fill="#333333" /> <!-- Address -->\n  <rect x="40" y="420" width="180" height="12" rx="4" fill="#D9D9D9" /> <!-- Delivery Timing -->\n  <rect x="300" y="400" width="50" height="15" rx="4" fill="#D9D9D9" /> <!-- Change Button -->\n  <!-- Footer (Sticky Bottom Section) -->\n  <rect x="0" y="740" width="400" height="60" fill="#FFFFFF" />\n  <rect x="20" y="755" width="120" height="20" rx="4" fill="#333333" /> <!-- Price Text -->\n  <rect x="260" y="750" width="120" height="30" rx="6" fill="#4CAF50" /> <!-- Continue Button -->\n</svg>\n</ideal_output>\n</example>\n<example>\n<project_name>\nProject Manager Co Pilot\n</project_name>\n<user_journey>\nI am a project manager. I login to the co pilot. I land on a dashboard where I am able to view project metrics and Risk metrics. Charts and graphs should be used where necessary. Also, there is a AI chatbot that is taking 30% of the screen space in the left side. The chatbot should be capable of having conversation with AI and provide responses in the form of text or table. \n</user_journey>\n<user_persona>\nProject Manager\n</user_persona>\n<project_brief>\nI am building a AI co pilot for project managers\n</project_brief>\n<ideal_output>\n<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">\n    <!-- Main Container -->\n    <rect width="1200" height="800" fill="#f8f9fa"/>\n    \n    <!-- Project Header -->\n    <rect x="20" y="20" width="1160" height="60" rx="8" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="40" y="55" font-family="Arial" font-size="24" font-weight="bold">Project Phoenix</text>\n    <text x="900" y="55" font-family="Arial" font-size="18" fill="#dc3545">Launch in 45 days</text>\n    \n    <!-- SDLC Progress Section -->\n    <rect x="20" y="100" width="1160" height="100" rx="8" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="40" y="125" font-family="Arial" font-size="16" font-weight="bold">SDLC Progress</text>\n    \n    <!-- Phase Boxes with Progress Circles -->\n    <rect x="40" y="140" width="200" height="40" rx="4" fill="#e8f5e9" stroke="#28a745"/>\n    <circle cx="70" cy="160" r="12" fill="#28a745"/>\n    <text x="65" y="165" font-family="Arial" font-size="12" fill="white">✓</text>\n    <text x="90" y="165" font-family="Arial" font-size="14">Planning</text>\n    <text x="180" y="165" font-family="Arial" font-size="14">100%</text>\n    \n    <rect x="260" y="140" width="200" height="40" rx="4" fill="#fff3e0" stroke="#ffc107"/>\n    <path d="M280,160 A12,12 0 1 1 280,159.9" stroke="#ffc107" fill="none" stroke-width="3"/>\n    <path d="M280,160 A12,12 0 0 1 290,170" stroke="#ffc107" fill="none" stroke-width="3"/>\n    <text x="300" y="165" font-family="Arial" font-size="14">Design</text>\n    <text x="400" y="165" font-family="Arial" font-size="14">85%</text>\n    \n    <rect x="480" y="140" width="200" height="40" rx="4" fill="#e3f2fd" stroke="#007bff"/>\n    <path d="M500,160 A12,12 0 1 1 500,159.9" stroke="#007bff" fill="none" stroke-width="3"/>\n    <path d="M500,160 A12,12 0 0 1 505,168" stroke="#007bff" fill="none" stroke-width="3"/>\n    <text x="520" y="165" font-family="Arial" font-size="14">Dev and Test</text>\n    <text x="620" y="165" font-family="Arial" font-size="14">60%</text>\n    \n    <rect x="700" y="140" width="200" height="40" rx="4" fill="#fce4ec" stroke="#e91e63"/>\n    <circle cx="730" cy="160" r="12" fill="none" stroke="#e91e63" stroke-width="2"/>\n    <text x="750" y="165" font-family="Arial" font-size="14">Launch</text>\n    <text x="840" y="165" font-family="Arial" font-size="14">0%</text>\n    \n    <!-- Overall Progress Bar -->\n    <rect x="920" y="140" width="260" height="40" rx="4" fill="#f5f5f5" stroke="#e0e0e0"/>\n    <rect x="920" y="140" width="156" height="40" rx="4" fill="#4caf50"/>\n    <text x="1000" y="165" font-family="Arial" font-size="14" fill="white">60% Complete</text>\n    \n    <!-- Left Section - Project Analytics -->\n    <rect x="20" y="220" width="460" height="560" rx="8" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="40" y="250" font-family="Arial" font-size="18" font-weight="bold">Project Analytics</text>\n    \n    <!-- Project Status (RAG) -->\n    <rect x="40" y="270" width="420" height="80" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="60" y="295" font-family="Arial" font-size="14">Project Status</text>\n    <circle cx="100" cy="320" r="15" fill="#28a745"/>\n    <text x="85" y="345" font-family="Arial" font-size="12">On Track</text>\n    <circle cx="160" cy="320" r="15" fill="#ffc107"/>\n    <text x="145" y="345" font-family="Arial" font-size="12">At Risk</text>\n    <circle cx="220" cy="320" r="15" fill="#dc3545"/>\n    <text x="205" y="345" font-family="Arial" font-size="12">Delayed</text>\n    \n    <!-- Task Status with Bar Chart -->\n    <rect x="40" y="370" width="420" height="120" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="60" y="395" font-family="Arial" font-size="14">Task Status</text>\n    <rect x="60" y="410" width="100" height="60" fill="#28a745"/>\n    <rect x="170" y="420" width="100" height="50" fill="#ffc107"/>\n    <rect x="280" y="430" width="100" height="40" fill="#dc3545"/>\n    <text x="85" y="450" font-family="Arial" font-size="12" fill="white">32 Done</text>\n    <text x="195" y="450" font-family="Arial" font-size="12" fill="white">15 In Progress</text>\n    <text x="305" y="450" font-family="Arial" font-size="12" fill="white">8 Blocked</text>\n    \n    <!-- Velocity Chart -->\n    <rect x="40" y="510" width="420" height="120" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="60" y="535" font-family="Arial" font-size="14">Velocity Chart</text>\n    <path d="M60,590 L440,590" stroke="#e0e0e0"/>\n    <path d="M60,580 L60,600" stroke="#e0e0e0"/>\n    <path d="M160,580 L160,600" stroke="#e0e0e0"/>\n    <path d="M260,580 L260,600" stroke="#e0e0e0"/>\n    <path d="M360,580 L360,600" stroke="#e0e0e0"/>\n    <path d="M60,560 Q150,580 240,550 T420,570" stroke="#007bff" fill="none" stroke-width="2"/>\n    <circle cx="60" cy="560" r="3" fill="#007bff"/>\n    <circle cx="150" cy="580" r="3" fill="#007bff"/>\n    <circle cx="240" cy="550" r="3" fill="#007bff"/>\n    <circle cx="420" cy="570" r="3" fill="#007bff"/>\n    \n    <!-- Burndown Chart -->\n    <rect x="40" y="650" width="420" height="120" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="60" y="675" font-family="Arial" font-size="14">Burndown Chart</text>\n    <path d="M60,730 L440,730" stroke="#e0e0e0"/>\n    <path d="M60,690 L440,760" stroke="#dc3545" stroke-dasharray="4"/>\n    <path d="M60,690 Q240,710 440,730" stroke="#28a745"/>\n    \n    <!-- Middle Section - Risk Management -->\n    <rect x="500" y="220" width="280" height="560" rx="8" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="520" y="250" font-family="Arial" font-size="18" font-weight="bold">Risk Management</text>\n    \n    <!-- RAID Matrix -->\n    <rect x="520" y="270" width="240" height="160" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="540" y="295" font-family="Arial" font-size="14">RAID Matrix</text>\n    <rect x="540" y="310" width="100" height="50" fill="#ffebee"/>\n    <rect x="640" y="310" width="100" height="50" fill="#fff3e0"/>\n    <rect x="540" y="360" width="100" height="50" fill="#e3f2fd"/>\n    <rect x="640" y="360" width="100" height="50" fill="#e8f5e9"/>\n    <text x="570" y="340" font-family="Arial" font-size="11">High Impact</text>\n    <text x="670" y="340" font-family="Arial" font-size="11">Medium Impact</text>\n    <text x="570" y="390" font-family="Arial" font-size="11">Low Impact</text>\n    <text x="670" y="390" font-family="Arial" font-size="11">Monitoring</text>\n    \n    <!-- Risk Items -->\n    <rect x="520" y="450" width="240" height="120" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="540" y="475" font-family="Arial" font-size="14">Top Risks</text>\n    <line x1="540" y1="490" x2="740" y2="490" stroke="#e0e0e0"/>\n    <circle cx="550" cy="510" r="4" fill="#dc3545"/>\n    <text x="565" y="515" font-family="Arial" font-size="12">Resource Shortage</text>\n    <circle cx="550" cy="530" r="4" fill="#ffc107"/>\n    <text x="565" y="535" font-family="Arial" font-size="12">Technical Debt</text>\n    <circle cx="550" cy="550" r="4" fill="#ffc107"/>\n    <text x="565" y="555" font-family="Arial" font-size="12">Security Compliance</text>\n    \n    <!-- Risk Charts -->\n    <rect x="520" y="590" width="240" height="80" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="540" y="615" font-family="Arial" font-size="14">Risk Overdue</text>\n    <circle cx="640" cy="635" r="25" fill="none" stroke="#e0e0e0"/>\n    <path d="M640,635 L640,610 A25,25 0 0,1 662,635 Z" fill="#dc3545"/>\n    <path d="M640,635 L662,635 A25,25 0 1,1 640,610 Z" fill="#28a745"/>\n    \n    <!-- Resource Utilization -->\n    <rect x="520" y="690" width="240" height="80" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="540" y="715" font-family="Arial" font-size="14">Resource Utilization</text>\n    <circle cx="640" cy="735" r="25" fill="none" stroke="#e0e0e0"/>\n    <path d="M640,735 L640,710 A25,25 0 0,1 662,735 Z" fill="#4caf50"/>\n    <path d="M640,735 L662,735 A25,25 0 0,1 640,760 Z" fill="#ffc107"/>\n    <path d="M640,735 L640,760 A25,25 0 0,1 618,735 Z" fill="#dc3545"/>\n    \n    <!-- Right Section - Chatbot with Improved Text Wrapping -->\n    <rect x="800" y="220" width="380" height="560" rx="8" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="820" y="250" font-family="Arial" font-size="18" font-weight="bold">Project Co-pilot</text>\n    \n    <!-- Chat Container -->\n    <rect x="820" y="270" width="340" height="460" rx="4" fill="#f8f9fa"/>\n    \n    <!-- User Message 1 -->\n    <rect x="840" y="290" width="280" height="35" rx="4" fill="#e3f2fd"/>\n    <text x="860" y="312" font-family="Arial" font-size="12">\n        <tspan x="860" y="312">What are the current bottlenecks in our</tspan>\n        <tspan x="860" y="328">project?</tspan>\n    </text>\n    \n    <!-- Bot Response 1 -->\n    <rect x="840" y="335" width="280" height="45" rx="4" fill="#ffffff" stroke="#e0e0e0"/>\n    <text x="860" y="357" font-family="Arial" font-size="12">\n        <tspan x="860" y="357">Currently 5 PRs are pending for approval for</tspan>\n        <tspan x="860" y="373">more than 48 hours</tspan>\n    </text>\n    \n    <!-- User Message 2 -->\n    <rect x="840" y="390" width="280" height="45" rx="4" fill="#e3f2fd"/>\n    <text x="860" y="412" font-family="Arial" font-size="12">\n        <tspan x="860" y="412">Can you provide the list of PRs and due date</tspan>\n        <tspan x="860" y="428">along with approver details?</tspan>\n    </text>\n</ideal_output>\n</example>\n</examples>\n\n'
};
const userPrompt = ({
  projectName,
  projectBrief,
  userPersona,
  userJourney
}) => `The project name is ${projectName}. Here is a brief description: ${projectBrief}

  The user persona is ${userPersona}. Here is the user journey: ${userJourney}`;
const displayWireframesTool = {
  name: "display_wireframes",
  description: "Display the generated SVG wireframes for all screens along with their respective titles on the webpage. The generated SVGs should be passed here as an array so that ",
  input_schema: {
    type: "object",
    properties: {
      wireframes: {
        type: "array",
        description: "A list of generated wireframes, containing their SVG code and title",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Name of the screen which this wireframe represents. Up to 10 words, but ideally less than 5."
            },
            image: {
              type: "string",
              description: 'SVG code for the generated wireframe for the given screen, such that it can be set as innerHTML of an element. Always set width="100%" and height="auto" on the <svg> tag.'
            }
          }
        }
      },
      explanation: {
        type: "string",
        description: "Rationale explaining the generated wireframes, with 5 or fewer bullet points for each screen. It should be well-formed, minified HTML without indentation or line break characters. Use headings, ul, ol wherever relevant."
      }
    }
  }
};
const buildPrompt = (userInput) => {
  return {
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 8192,
    system: systemPrompt(),
    tools: [displayWireframesTool],
    tool_choice: {
      type: "tool",
      name: displayWireframesTool.name
    },
    messages: [{
      role: "user",
      content: [examples, {
        type: "text",
        text: userPrompt(userInput)
      }]
    }]
  };
};

dotenv.config();
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});
const conversations = /* @__PURE__ */ new Map();
const prompts = /* @__PURE__ */ new Map();
const POST = async ({
  request
}) => {
  try {
    const {
      initialInput,
      subsequentMessage,
      conversationId
    } = await request.json();
    const prompt = initialInput ? buildPrompt(initialInput) : prompts.get(conversationId);
    if (conversationId && subsequentMessage) {
      prompt.messages.push({
        role: "user",
        content: subsequentMessage
      });
    }
    const assistantMessage = await client.messages.create(prompt);
    const currentConversationId = conversationId ?? v6();
    conversations.set(currentConversationId, [...prompt.messages, assistantMessage]);
    prompts.set(currentConversationId, prompt);
    console.log(assistantMessage, conversationId);
    return new Response(JSON.stringify({
      assistantMessage,
      currentConversationId
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({
      error: "Failed to generate wireframe"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };