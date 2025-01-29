import { FileTextFilled, StarFilled, HomeFilled } from '@ant-design/icons'
import type { MenuProps, MenuTheme } from 'antd'
import { Menu, Switch } from 'antd'
import { useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const handleFavoriteNav = () => {
  window.location.href = '/favorite'
}

const handleMealPlanNav = () => {
  window.location.href = '/meal-plan'
}

const handleHomeNav = () => {
  window.location.href = '/'
}

const items: MenuItem[] = [
  {
    key: 'sub0',
    label: 'Home',
    icon: <HomeFilled />,
    onClick: handleHomeNav,
  },
  {
    key: 'sub1',
    label: 'Favorite',
    icon: <StarFilled />,
    onClick: handleFavoriteNav,
  },
  {
    key: 'sub2',
    label: 'Meal Plan',
    icon: <FileTextFilled />,
    onClick: handleMealPlanNav,
  },
]
const Navbar = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark')
  const [current, setCurrent] = useState('')

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light')
  }

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256, height: '98vh' }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  )
}

export default Navbar
