import styled from 'styled-components'
//colors

export const Colors = {
  primary: '#116A4F', // Dark Green
  secondary: '#74C69D', // Light Green
  tertiary: '#D9F09B', // Light Lime Green
  quaternary: '#171F23', // Almost Black (for text, icons)
  quinary: '#F9E79F', // Soft Yellow
  brand: '#1E3932', // Deep Jungle Green
  accent1: '#284B63', // Teal Blue (possibly for CTAs/buttons)
  accent2: '#F8A07E', // Soft Coral (for warnings, error states, or secondary CTAs)
  white: '#FFFFFF', // White (for backgrounds or text)
  black: '#000000', // Black (for text)
}

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  background-color: ${primary};
  padding-top: 10px;
`

export const InnerContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
`

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
  background-color: ${Colors.primary};
`

export const PageLogo = styled.Image`
  width: 100%;
  height: 200px;
`

export const Avatar = styled.Image`
  width: 150px;
  height: 150px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  margin-bottom: 10px;
  margin-top: 10px;
`

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${primary};
  padding: 10px;

  ${props =>
    props.welcome &&
    `
    font-size:35px;
  `}
`

export const SubTitle = styled.Text`
  font-size: 20px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${primary};
  padding: 10px;
  margin-top: 15px;

  ${props =>
    props.welcome &&
    `
    margin-bottom:5px;
    font-weight:normal;
    `}
`

export const StyledFormArea = styled.View`
  width: 90%;
`

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  /* margin-vertical: 3px; */
  /* margin-bottom: 10px; */
  color: ${tertiary};
`

export const StyledInputLabel = styled.Text`
  color: ${primary};
  font-size: 16px;
  text-align: left;
`
export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`
export const RightIcon = styled.TouchableOpacity`
  right: 0px;
  top: 38px;
  position: absolute;
  z-index: 1;
  width: 15%;
  height: 100%;
`

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${tertiary};
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
  width: 48%;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  margin-top: 20px;
  ${props =>
    props.google == true &&
    `
  background-color:${Colors.white};
  flex-direction:row;
  justify-coontent:center;
  width:100%;
  `};
`

export const ButtonText = styled.Text`
  color: ${Colors.primary};
  font-size: 16px;

  ${props => props.google && `padding:5px`}
`

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${tertiary};
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${tertiary};
  margin-vertical: 10px;
`

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const TextLinkContent = styled.Text`
  color: ${Colors.accent2};
  font-size: 15px;
`
