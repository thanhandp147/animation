import React, { memo } from 'react';
import PropTypes from 'prop-types';

const ListItems = memo(({items}) => {

    const [checkedItems, setCheckedItems] = React.useState([]);

    const handleItemPress = (index) => {
        const newCheckedItems = [...checkedItems];
        if (newCheckedItems.includes(index)) {
            newCheckedItems.splice(newCheckedItems.indexOf(index), 1);
        } else {
            newCheckedItems.push(index);
        }
        setCheckedItems(newCheckedItems);
    };

    return (
        <>
            {/* { items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => handleItemPress(index)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            ))} */}
        </>
    );
});



export default ListItems;