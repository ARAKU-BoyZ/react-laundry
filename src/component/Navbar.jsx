import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react"


const Navigation = () => {
    return (
      <Navbar className="bg-primary-300">
        <NavbarBrand>
          <p className="font-bold text-inherit">Enigma Camp</p>
        </NavbarBrand>
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="Profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p>Signed in as</p>
              </DropdownItem>
              <DropdownItem key="Customers">Setting</DropdownItem>
              <DropdownItem key="Logout">Log Out</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    )
}

export default Navigation