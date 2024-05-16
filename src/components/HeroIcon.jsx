
function HeroIcon({ icon: Icon, size = 30, color = '#FFF', ...props }) {
   return <Icon  style={{ width: size, height: size, color }} {...props}/>;
}

export default HeroIcon;