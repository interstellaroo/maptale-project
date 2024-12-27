from django.db import models
from polymorphic.models import PolymorphicModel
from project_mgmt.models import Node

class BaseItem(PolymorphicModel):
    node = models.ForeignKey(Node, on_delete=models.CASCADE, related_name='items')
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
class Note(BaseItem):
    text = models.TextField()

    def __str__(self):
        return f"Note: {self.name}"


class Map(BaseItem):
    image = models.ImageField(upload_to='images/') 

    def __str__(self):
        return f"Map: {self.name}"
