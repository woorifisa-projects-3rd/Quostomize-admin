import Link from 'next/link'
import Image from "next/image";

const NavMenuItem = ({menuName, menuHref, iconSrc}) => {
  
  return (
    <li>
      <Link
          href={menuHref}
          className="flex items-center space-x-4 text-base font-bold px-8 py-4 text-[#FFFFFF] hover:bg-[#3081F7] transition-colors"
            target={menuHref.startsWith("https") ? '_blank' : '_self'}
            rel={menuHref.startsWith("https") ? 'noopener noreferrer' : ''}>
        <Image src={iconSrc}
               alt={menuName}
               width={24}
               height={24}
               className="w-6 h-6"
        />
          <span>{menuName}</span>
      </Link>
    </li>
  )
}

export default NavMenuItem