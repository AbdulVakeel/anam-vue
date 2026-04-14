import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import Dashboard from '../pages/Dashboard.vue'
import Ecommerce from '../pages/Ecommerce.vue'
import Investment from '../pages/Investment.vue'
import AdvanceCrypto from '../pages/AdvanceCrypto.vue'
import Nft from '../pages/Nft.vue'
import Users from '../pages/Users.vue'
import Login from '../pages/Login.vue'
import LoginBox from '../pages/LoginBox.vue'
import Profile from '../pages/Profile.vue'
import Tickets from '../pages/Tickets.vue'
import Register from '../pages/Register.vue'
import RegisterBox from '../pages/RegisterBox.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import ForgotPasswordBox from '../pages/ForgotPasswordBox.vue'
import TwoStepVerification from '../pages/TwoStepVerification.vue'
import TwoStepBox from '../pages/TwoStepBox.vue'
import Password from '../pages/Password.vue'
import Settings from '../pages/Settings.vue'
import Card from '../pages/Card.vue'
import DemoCard from '../pages/DemoCard.vue'
import Security from '../pages/Security.vue'
import Pricing from '../pages/Pricing.vue'
import Banners from '../pages/Banners.vue'
import CardBlog from '../pages/CardBlog.vue'
import BasicBlog from '../pages/BasicBlog.vue'
import SliderBlog from '../pages/SliderBlog.vue'
import PostDetails from '../pages/PostDetails.vue'
import Products from '../pages/Products.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import ProductsList from '../pages/ProductsList.vue'
import Checkout from '../pages/Checkout.vue'
import Chart from '../pages/Chart.vue'
import Notifications from '../pages/Notifications.vue'
import Chat from '../pages/Chat.vue'
import Calendar from '../pages/Calendar.vue'
import Help from '../pages/Help.vue'
import NotFound from '../pages/NotFound.vue'
import ServerError from '../pages/ServerError.vue'
import ServiceUnavailable from '../pages/ServiceUnavailable.vue'
import AccessDenied from '../pages/AccessDenied.vue'
import Grid from '../pages/Grid.vue'
import Badge from '../pages/Badge.vue'
import TabButton from '../pages/TabButton.vue'
import Alert from '../pages/Alert.vue'
import ToggleInput from '../pages/ToggleInput.vue'
import TextEditor from '../pages/TextEditor.vue'
import Button from '../pages/Button.vue'
import Dropdown from '../pages/Dropdown.vue'
import SectionCard from '../pages/SectionCard.vue'
import FlashMessage from '../pages/FlashMessage.vue'
import Heroicons from '../pages/Heroicons.vue'
import BoxIcons from '../pages/BoxIcons.vue'
import TablerIcons from '../pages/TablerIcons.vue'
import LucideIcons from '../pages/LucideIcons.vue'
import IconifyIcons from '../pages/IconifyIcons.vue'
import DateTimePicker from '../pages/DateTimePicker.vue'
import Avatar from '../pages/Avatar.vue'
import Tooltip from '../pages/Tooltip.vue'
import Typography from '../pages/Typography.vue'
import DialogModal from '../pages/DialogModal.vue'
import ColorPicker from '../pages/ColorPicker.vue'
import Package from '../pages/Package.vue'
import Crypto from '../pages/Crypto.vue'
import ChatTeam from '../pages/ChatTeam.vue'
import AnimationCard from '../pages/AnimationCard.vue'
import BasicCard from '../pages/BasicCard.vue'
import Seller from '../pages/Seller.vue'
import DemoSlider from '../pages/DemoSlider.vue'
import RankCard from '../pages/RankCard.vue'
import ComingSoon from '../pages/ComingSoon.vue'
import Maintenance from '../pages/Maintenance.vue'
import Timeline from '../pages/Timeline.vue'
import AboutUs from '../pages/AboutUs.vue'
import ProductSlider from '../pages/ProductSlider.vue'
import Customers from '../pages/Customers.vue'
import BasicTables from '../pages/BasicTables.vue'
import DataTables from '../pages/DataTables.vue'
import ResponsiveTables from '../pages/ResponsiveTables.vue'
import AdvanceCard from '../pages/AdvanceCard.vue'
import Job from '../pages/Job.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { title: 'Login' },
  },

  {
    path: '/registerBox',
    name: 'registerBox',
    component: RegisterBox,
    meta: { title: 'Register Box' },
  },

  {
    path: '/loginBox',
    name: 'loginBox',
    component: LoginBox,
    meta: { title: 'Login Box' },
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { title: 'Register' },
  },
  {
    path: '/forgotPassword',
    name: 'forgotPassword',
    component: ForgotPassword,
    meta: { title: 'Forgot Password' },
  },
   {
    path: '/forgotPasswordBox',
    name: 'forgotPasswordBox',
    component: ForgotPasswordBox,
    meta: { title: 'Forgot Password Box' },
  },

  {
    path: '/twoStepBox',
    name: 'twoStepBox',
    component: TwoStepBox,
    meta: { title: 'Two Step Box' },
  },

   {
    path: '/twoStepVerification',
    name: 'twoStepVerification',
    component: TwoStepVerification,
    meta: { title: 'Two Step Verification' },
  },

  {
    path: '/notFound',
    name: 'notFound',
    component: NotFound,
    meta: { title: 'Not Found' },
  },

  
    {
    path: '/serverError',
    name: 'serverError',
    component: ServerError,
    meta: { title: 'Server Error' },
  },

   {
    path: '/serviceUnavailable',
    name: 'serviceUnavailable',
    component: ServiceUnavailable,
    meta: { title: 'Service Unavailable' },
  },

   {
    path: '/accessDenied',
    name: 'accessDenied',
    component: AccessDenied,
    meta: { title: 'Access Denied' },
  },


  {
    path: '/',
    component: DefaultLayout,
    children: [
    { path: '/', name: 'dashboard', component: Dashboard, meta: { title: 'Dashboard', breadcrumb: 'Dashboard'  } },
    { path: 'ecommerce', name: 'ecommerce', component: Ecommerce, meta: { title: 'Ecommerce',breadcrumb: 'Ecommerce' } },
    { path: 'investment', name: 'investment', component: Investment, meta: { title: 'Investment',breadcrumb: 'Investment' } },
    { path: 'advanceCrypto', name: 'advanceCrypto', component: AdvanceCrypto, meta: { title: 'Advance Crypto',breadcrumb: 'Advance Crypto' } },
    { path: 'nft', name: 'nft', component: Nft, meta: { title: 'Nft',breadcrumb: 'Nft' } },
    { path: 'job', name: 'job', component: Job, meta: { title: 'Job Portals',breadcrumb: 'Job Portals' } },
    { path: 'users', name: 'users', component: Users, meta: { title: 'Users',breadcrumb: 'Users'  } },
    { path: 'crypto', name: 'crypto', component: Crypto, meta: { title: 'Tradingview Crypto',breadcrumb: 'Tradingview Crypto' } },
    { path: 'chatTeam', name: 'chatTeam', component: ChatTeam, meta: { title: 'ChatTeam',breadcrumb: 'ChatTeam' } },
    { path: 'password', name: 'password', component: Password, meta: { title: 'Password',breadcrumb: 'Password' } },
    { path: 'profile', name: 'profile', component: Profile, meta: { title: 'Profile',breadcrumb: 'Profile' } },
    { path: 'settings', name: 'settings', component: Settings, meta: { title: 'Settings',breadcrumb: 'Settings' } },
    { path: 'products', name: 'products', component: Products, meta: { title: 'Products',breadcrumb: 'Products' } },
    { path: 'productDetails', name: 'productDetails', component: ProductDetails, meta: { title: 'Product Details',breadcrumb: 'Product Details' } },
    { path: 'productsList', name: 'productsList', component: ProductsList, meta: { title: 'Products List',breadcrumb: 'Products List' } },
    { path: 'seller', name: 'seller', component: Seller, meta: { title: 'Seller',breadcrumb: 'Seller' } },
    { path: 'customers', name: 'customers', component: Customers, meta: { title: 'Customers',breadcrumb: 'Customers' } },
    { path: 'basicTables', name: 'basicTables', component: BasicTables, meta: { title: 'Basic Tables',breadcrumb: 'Basic Tables' } },
    { path: 'dataTables', name: 'dataTables', component: DataTables, meta: { title: 'Data Tables',breadcrumb: 'Data Tables' } },
    { path: 'responsiveTables', name: 'responsiveTables', component: ResponsiveTables, meta: { title: 'Responsive Tables',breadcrumb: 'Responsive Tables' } },
    { path: 'checkout', name: 'checkout', component: Checkout, meta: { title: 'Checkout',breadcrumb: 'Checkout' } },
    { path: 'advanceCard', name: 'advanceCard', component: AdvanceCard, meta: { title: 'Advance Card',breadcrumb: 'Advance Card' } },
    { path: 'tickets', name: 'tickets', component: Tickets, meta: { title: 'Tickets',breadcrumb: 'Tickets' } },
    { path: 'security', name: 'security', component: Security, meta: { title: 'Security',breadcrumb: 'Security' } },
    { path: 'cardBlog', name: 'cardBlog', component: CardBlog, meta: { title: 'Card Blog',breadcrumb: 'Card Blog' } },
    { path: 'basicBlog', name: 'basicBlog', component: BasicBlog, meta: { title: 'Basic Blog',breadcrumb: 'Basic Blog' } },
    { path: 'postDetails', name: 'postDetails', component: PostDetails, meta: { title: 'Post Details',breadcrumb: 'Post Details' } },
    { path: 'sliderBlog', name: 'sliderBlog', component: SliderBlog, meta: { title: 'Slider Blog',breadcrumb: 'Slider Blog' } },
    { path: 'card', name: 'card', component: Card, meta: { title: 'Card',breadcrumb: 'Card' } },
    { path: 'demoCard', name: 'demoCard', component: DemoCard, meta: { title: 'Software Demo Card',breadcrumb: 'Software Demo Card' } },
    { path: 'demoSlider', name: 'demoSlider', component: DemoSlider, meta: { title: 'Demo Slider',breadcrumb: 'Demo Slider' } },
    { path: 'rankCard', name: 'rankCard', component: RankCard, meta: { title: 'Rank Card',breadcrumb: 'Rank Card' } },
    { path: 'comingSoon', name: 'comingSoon', component: ComingSoon, meta: { title: 'Coming Soon',breadcrumb: 'Coming Soon' } },
    { path: 'maintenance', name: 'maintenance', component: Maintenance, meta: { title: 'Maintenance Mode',breadcrumb: 'Maintenance Mode' } },
    { path: 'timeline', name: 'timeline', component: Timeline, meta: { title: 'Timeline',breadcrumb: 'Timeline' } },
    { path: 'aboutUs', name: 'aboutUs', component: AboutUs, meta: { title: 'About Us',breadcrumb: 'About Us' } },
    { path: 'productSlider', name: 'productSlider', component: ProductSlider, meta: { title: 'Product Slider',breadcrumb: 'Product Slider' } },
    { path: 'grid', name: 'grid', component: Grid, meta: { title: 'Grid',breadcrumb: 'Grid' } },
    { path: 'badge', name: 'badge', component: Badge, meta: { title: 'Badge',breadcrumb: 'Badge' } },
    { path: 'tabButton', name: 'tabButton', component: TabButton, meta: { title: 'TabButton',breadcrumb: 'TabButton' } },
    { path: 'alert', name: 'alert', component: Alert, meta: { title: 'Alert',breadcrumb: 'Alert' } },
    { path: 'toggleInput', name: 'toggleInput', component: ToggleInput, meta: { title: 'ToggleInput',breadcrumb: 'Toggle Input' } },
    { path: 'textEditor', name: 'textEditor', component: TextEditor, meta: { title: 'TextEditor',breadcrumb: 'Text Editor' } },
    { path: 'button', name: 'button', component: Button, meta: { title: 'Button',breadcrumb: 'Button' } },
    { path: 'dropdown', name: 'dropdown', component: Dropdown, meta: { title: 'Dropdown',breadcrumb: 'Dropdown' } },
    { path: 'sectionCard', name: 'sectionCard', component: SectionCard, meta: { title: 'SectionCard',breadcrumb: 'SectionCard' } },
    { path: 'flashMessage', name: 'flashMessage', component: FlashMessage, meta: { title: 'FlashMessage',breadcrumb: 'FlashMessage' } },
    { path: 'animationCard', name: 'animationCard', component: AnimationCard, meta: { title: 'AnimationCard',breadcrumb: 'Animation Card' } },
    { path: 'basicCard', name: 'basicCard', component: BasicCard, meta: { title: 'BasicCard',breadcrumb: 'Basic Card' } },
    { path: 'heroicons', name: 'heroicons', component: Heroicons, meta: { title: 'Heroicons',breadcrumb: 'Hero icons' } },
    { path: 'boxIcons', name: 'boxIcons', component: BoxIcons, meta: { title: 'Box Icons',breadcrumb: 'Box Icons' } },
    { path: 'tablerIcons', name: 'tablerIcons', component: TablerIcons, meta: { title: 'Tabler Icons',breadcrumb: 'Tabler Icons' } },
    { path: 'lucideIcons', name: 'lucideIcons', component: LucideIcons, meta: { title: 'Lucide Icons',breadcrumb: 'Lucide Icons' } },
    { path: 'iconifyIcons', name: 'iconifyIcons', component: IconifyIcons, meta: { title: 'Iconify Icons',breadcrumb: 'Iconify Icons' } },
    { path: 'dateTimePicker', name: 'dateTimePicker', component: DateTimePicker, meta: { title: 'Date Time Picker',breadcrumb: 'Date Time Picker' } },
    { path: 'tooltip', name: 'tooltip', component: Tooltip, meta: { title: 'Tooltip',breadcrumb: 'Tooltip' } },
    { path: 'avatar', name: 'avatar', component: Avatar, meta: { title: 'Avatar',breadcrumb: 'Avatar' } },
    { path: 'typography', name: 'typography', component: Typography, meta: { title: 'Typography',breadcrumb: 'Typography' } },
    { path: 'dialogModal', name: 'dialogModal', component: DialogModal, meta: { title: 'DialogModal',breadcrumb: 'DialogModal' } },
    { path: 'colorPicker', name: 'colorPicker', component: ColorPicker, meta: { title: 'ColorPicker',breadcrumb: 'ColorPicker' } },
    { path: 'package', name: 'package', component: Package, meta: { title: 'Package',breadcrumb: 'Package' } },
    { path: 'pricing', name: 'pricing', component: Pricing, meta: { title: 'Pricing',breadcrumb: 'Pricing' } },
    { path: 'card', name: 'card', component: Card, meta: { title: 'Card',breadcrumb: 'Card' } },
    { path: 'banners', name: 'banners', component: Banners, meta: { title: 'Banners',breadcrumb: 'Banners' } },
    { path: 'chart', name: 'chart', component: Chart, meta: { title: 'Chart',breadcrumb: 'Chart' } },
    { path: 'notifications', name: 'notifications', component: Notifications, meta: { title: 'Notifications',breadcrumb: 'Notifications' } },
    { path: 'chat', name: 'chat', component: Chat, meta: { title: 'Chat',breadcrumb: 'Chat' } },
    { path: 'calendar', name: 'calendar', component: Calendar, meta: { title: 'Calendar',breadcrumb: 'Calendar' } },
    { path: 'settings', name: 'settings', component: Settings, meta: { title: 'Settings',breadcrumb: 'Settings' } },
    { path: 'help', name: 'help', component: Help, meta: { title: 'Help',breadcrumb: 'Help' } },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = (to.meta?.title ? to.meta.title + ' • ' : '') + 'AnamUI'
})

export default router
