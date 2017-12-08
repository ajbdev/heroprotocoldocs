import styled from 'styled-components'

let white = '#fafafa';
const colors = {
    white: '#fafafa'
}

export const Button = styled.button`
    display: inline-block;
    border: 2px solid ${white};
    color: ${white};
    background: transparent;
    border-radius: 5px;
    min-height: 30px;
    vertical-align: middle;
    margin: 2px;
    padding: 4px 8px;
    cursor: pointer;
    outline: none;
    user-select: none;
`

export const Layout = styled.div`
    background: '#222';
    color: ${white};
`

export const Content = styled.div`
    margin-left: 250px;
    padding: 10px;
`

export const Sidebar = styled.div`
    font-size: 13px;
    background: #333;
    overflow: auto;
    position: fixed;
    height: 100vh;
    left: 0px;
    top: 0px;
    bottom: 0px;
    width: 250px;
    display: block;
`