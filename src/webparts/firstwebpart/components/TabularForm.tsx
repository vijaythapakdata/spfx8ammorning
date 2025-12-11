import * as React from 'react';
import { Pivot,PivotItem,IStyleSet,ILabelStyles, Label, PrimaryButton, TextField, Slider, ChoiceGroup, Dropdown, DatePicker } from '@fluentui/react';

const lableStyles:Partial<IStyleSet<ILabelStyles>>={
    root:{
        marginTop:10
    }
}

export const TabularForm:React.FC<{}>=()=>{
    return(
        <>
        <Pivot aria-label='Baisc Pivot item'>
            <PivotItem
            headerText='My Files'
            headerButtonProps={{
                'data-order':1,
                'data-title':'My files',
                'aria-label':'My files'
            }}
            itemCount={101}
            itemIcon='Globe'
            >
                <Label styles={lableStyles}>Content for my files</Label>

            </PivotItem>
            <PivotItem
            headerText='Recent'
            headerButtonProps={{
                'data-order':2,
                'data-title':'My  Recent files',
                'aria-label':'My Recent files'
            }}
            itemCount={101}
            itemIcon='Recent'
            >
                <Label styles={lableStyles}>Content for my Recenet Files</Label>
                <form>
                    <TextField
                    label='Name'
                    placeholder='Enter your name'
                    iconProps={{iconName:'people'}}
                    />
                     <TextField
                    label='Email'
                    placeholder='Enter your email'
                    iconProps={{iconName:'mail'}}
                    />
                    <Dropdown
                    label='Department'
                    options={[
                        {key:'HR',text:'HR'},
                        {key:'IT',text:'IT'},
                        {key:'Finance',text:'Finance'},
                    ]}
                    />
                    <ChoiceGroup
                    label='Gender'
                    options={[
                        {key:'Male',text:'Female'},
                        {key:'Female',text:'Female'}
                    ]}
                    />
                    <Slider
                    label='Age'
                    min={0}
                    max={100}
                    step={1}
                    />
                     <TextField
                    label='Address'
                    placeholder='Enter your address'
                    iconProps={{iconName:'home'}}
                    multiline
                    rows={5}
                    />
                    <br/>
                    <PrimaryButton
                    label='Submit'
                    onClick={()=>alert('form submiteed')}
                    iconProps={{iconName:'save'}}
                    />
                </form>

            </PivotItem>
             <PivotItem
            headerText='Shared with me files'
            headerButtonProps={{
                'data-order':3,
                'data-title':'My  shared with me files',
                'aria-label':'My  shared with me files'
            }}
            itemCount={101}
            itemIcon='Ringer'
            >
                <Label styles={lableStyles}>Content for  My  shared with me files</Label>
                <DatePicker
                label='My Calendar'
                
                />
                
                </PivotItem>
        </Pivot>
        </>
    )
}
