for i in range (0, 5):
         Pass_name = input("ENTER THE PASSENGER'S NAME:")
         price_eco = 5700
         price_busi = 12000
         Pass_age = int(input("ENTER THE PASSENGER'S AGE:"))
         Class_type = input("ENTER  THE CLASS TYPE  \nECONOMY OR BUSINESS  ")
         if Class_type == "ECONOMY":
                if Pass_age >=60:
                        Discount = price_eco*(30/100)
                        price_eco = price_eco - Discount
                        print (f"\n PASSENGER'S NAME    : {Pass_name} \nFor senior citizens we have 30% discount....!\nYOUR TICKET PRICE      : {price_eco}")
                elif Pass_age <=12:
                        Discount = price_eco*(50/100)
                        price_eco = price_eco - Discount
                        print (f" \nPASSENGER'S NAME    : {Pass_name} \nFor children we have 50% discount....!\nYOUR TICKET PRICE : {price_eco}")
                else:
                        print (f" \nPASSENGER'S NAME    : {Pass_name}\nYOUR TICKET PRICE      : {price_eco}")
 
         if Class_type == "BUSINESS":
                if Pass_age >=60:
                        Discount = price_busi*(30/100)
                        price_busi = price_busi - Discount
                        print (f" \nPASSENGER'S NAME    : {Pass_name} \nFor senior citizens we have 30% discount....!\n  YOUR TICKET PRICE      : {price_busi}")
                elif Pass_age <=12:
                        Discount = price_busi*(50/100)
                        price_busi = price_busi - Discount
                        print (f" \nPASSENGER'S NAME    : {Pass_name} \nFor children we have 50% discount....!\nYOUR TICKET PRICE      : {price_busi}")
                else:
                        print (f" \nPASSENGER'S NAME    : {Pass_name} \nYOUR TICKET PRICE : {price_busi}")
         print("\n")      
